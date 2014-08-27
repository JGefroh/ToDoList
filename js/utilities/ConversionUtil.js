/**
 * Created by Joseph on 8/24/2014.
 */
function ConversionUtil() {
}
ConversionUtil.formatDate = function(dateToConvert) {
    return 'potato';
    var formatted = dateToConvert.getHours() + ":" + (dateToConvert.getMinutes() < 10 ? "0" + dateToConvert.getMinutes(): dateToConvert.getMinutes());
    console.info(formatted);
    return formatted;
};

ConversionUtil.convertMSToHours = function(time) {
    return (Math.round(time / 60000) / 60);
};

ConversionUtil.potato = function() {

}