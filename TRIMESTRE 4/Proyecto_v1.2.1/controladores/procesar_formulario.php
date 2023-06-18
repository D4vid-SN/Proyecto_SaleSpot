<?php
// Datos de conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "proyecto";

// Crear la conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Error al conectar con la base de datos: " . $conn->connect_error);
}

// Obtener los datos del formulario
$primerNombre = $_POST['first-name'];
$segundoNombre = $_POST['second-name'];
$primerApellido = $_POST['last-name'];
$segundoApellido = $_POST['second-last-name'];
$tipoDocumento = $_POST['document-type'];
$numeroDocumento = $_POST['document-number'];
$email = $_POST['email'];
$contrasena = $_POST['password'];

// Verificar si el usuario ya está registrado
$sql = "SELECT * FROM usuarios WHERE tipo_documento = '$tipoDocumento' AND numero_documento = '$numeroDocumento'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // El usuario ya está registrado, mostrar un mensaje de error
    echo "El usuario ya está registrado.";
} else {
    // Generar el hash de la contraseña
    $contrasenaHash = password_hash($contrasena, PASSWORD_DEFAULT);

    // Insertar los datos en la tabla
    $sql = "INSERT INTO usuarios (primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, tipo_documento, numero_documento, email, contrasena)
            VALUES ('$primerNombre', '$segundoNombre', '$primerApellido', '$segundoApellido', '$tipoDocumento', '$numeroDocumento', '$email', '$contrasenaHash')";

    if ($conn->query($sql) === TRUE) {
        echo "Datos insertados correctamente";
    } else {
        echo "Error al insertar datos: " . $conn->error;
    }
}

// Cerrar la conexión a la base de datos
$conn->close();
?>
<br><br>

<button onclick="location.href='../vistas/index.html';">Regresar al menú principal</button>



