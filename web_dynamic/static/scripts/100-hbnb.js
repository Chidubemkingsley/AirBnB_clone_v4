$(document).ready(function() {
    $('#list li').each(function() {
        $(this).prepend('<input type="checkbox">');
    });
});
