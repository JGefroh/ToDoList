package com.jgefroh.server.core;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.persistence.EntityManager;

/**
 * @author Joseph Gefroh
 */
public abstract class AbstractGenericDAO {
    public abstract EntityManager getEntityManager();


    public <T> void create(final T entity) {
        getEntityManager().persist(entity);
    }

    /**
     * @return the entity if found; null otherwise
     */
    public <T> T get(final Class<T> clazz, final Object id) {
        return getEntityManager().find(clazz, id);
    }

    public <T> T update(final T entity) {
        if (entity != null) {
            return getEntityManager().merge(entity);
        }
        return null;
    }

    public <T> Collection<T> updateAll(final Collection<T> entities) {
        List<T> updatedEntities = new ArrayList<T>();
        if (entities != null) {
            for (T entity : entities) {
                T updatedEntity = update(entity);
                if (updatedEntity != null) {
                    updatedEntities.add(updatedEntity);
                }
            }
        }
        return updatedEntities;
    }

    public <T> void delete(final Class<T> clazz, final Object id) {
        T entity = get(clazz, id);
        if (entity != null) {
            getEntityManager().remove(entity);
        }
    }

    public <T> T reference(final Class<T> clazz, final Object id) {
        return getEntityManager().getReference(clazz, id);
    }
}
