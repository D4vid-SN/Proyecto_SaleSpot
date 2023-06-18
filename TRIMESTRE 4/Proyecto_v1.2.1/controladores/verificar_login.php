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
$tipoDocumento = $_POST['document-type'];
$numeroDocumento = $_POST['document-number'];
$contrasena = $_POST["password"];

// Obtener el hash de contraseña de la base de datos
$sql = "SELECT contrasena FROM usuarios WHERE tipo_documento = '$tipoDocumento' AND numero_documento = '$numeroDocumento'";
$result = $conn->query($sql);

if ($result->num_rows == 1) {
    // Obtener la contraseña almacenada en forma de hash
    $row = $result->fetch_assoc();
    $contrasenaHash = $row['contrasena'];
    
    // Verificar la contraseña
    if (password_verify($contrasena, $contrasenaHash)) {
        // Los datos son correctos, redireccionar a la página de bienvenida
        header("Location: ../vistas/bienvenida.html");
        exit();
    }
}

// Los datos son incorrectos o el usuario no existe, mostrar un mensaje de error
echo "Error de inicio de sesión. Por favor, verifica tus datos.";

// Cerrar la conexión a la base de datos
$conn->close();
?>

<br><br>
<button onclick="location.href='../vistas/index.html';">Regresar al menú principal</button>



