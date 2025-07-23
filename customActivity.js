var connection = new Postmonger.Session();

$(window).ready(function () {
  connection.trigger('ready');

  $('#activityForm').submit(function (e) {
    e.preventDefault();
    var nombre = $('#nombre').val();
    var telefono = $('#telefono').val();
    var payload = {
      arguments: {
        execute: {
          inArguments: [
            { nombre: nombre },
            { telefono: telefono }
          ]
        }
      }
    };
    connection.trigger('updateActivity', payload);
    $('#mensajeExito').show();
  });
}); 