FROM alpine:3.6 AS builder

RUN apk add --update \
    bash \
    build-base \
    curl \
    file \
    git \
    nodejs \
    nodejs-npm \
    openjdk7 \
    libressl-dev \
    readline-dev \
    vim \
    wget \
    zlib-dev

RUN npm install -g grunt-cli
RUN wget https://services.gradle.org/distributions/gradle-3.5-bin.zip
RUN unzip -d /usr/local/ ./gradle-3.5-bin.zip
RUN chmod +x /usr/local/gradle-3.5/
ENV PATH /usr/local/gradle-3.5/lib:/usr/local/gradle-3.5/bin:/usr/lib/jvm/java-1.7-openjdk:${PATH}
ENV JAVA_HOME /usr/lib/jvm/java-1.7-openjdk
COPY . /todolist
WORKDIR /todolist/ToDoListClient/
RUN npm install
WORKDIR /todolist/
RUN printf "applicationName=ToDoList\napplicationServerLibrariesPath=ToDoListServerDependencies" > ./gradle.properties
RUN gradle prod

FROM tomee:6-jre-1.7.4-plus AS release
ENV JAVA_OPTS -Dsecurerandom.source=file:/dev/urandom
ENV CATALINA_OPTS -Dsecurerandom.source=file:/dev/urandom
WORKDIR $CATALINA_HOME/webapps
RUN rm -rf ./ROOT
COPY --from=builder todolist/GradleBuild/libs/todolist.war /usr/local/tomee/webapps/ROOT.war
