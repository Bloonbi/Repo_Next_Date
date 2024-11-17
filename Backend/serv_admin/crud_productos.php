
        <?php
        header('Content-Type: application/json');
        include '../controlador/conecta_bd.php';
        
        error_reporting(E_ALL);
        ini_set('display_errors', 1);
        
        $action = isset($_POST['action']) ? $_POST['action'] : (isset($_GET['action']) ? $_GET['action'] : null);
        
        if ($action === 'create') {
          // Crear producto
  $nombre = $_POST['nombre'];
  $descripcion = $_POST['descripcion'];
  $precio = $_POST['precio'];
  $imagen = ''; // lógica para manejar la imagen 


  if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === UPLOAD_ERR_OK) {
    $uploadDir = 'uploads/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }
    $uploadFile = $uploadDir . basename($_FILES['imagen']['name']);
    if (move_uploaded_file($_FILES['imagen']['tmp_name'], $uploadFile)) {
        $imagen = $uploadFile;
    } else {
        echo json_encode(['error' => 'Error al subir la imagen']);
        exit;
    }
} elseif (isset($_FILES['imagen']) && $_FILES['imagen']['error'] !== UPLOAD_ERR_NO_FILE) {
    echo json_encode(['error' => 'Error al subir la imagen']);
    exit;
}


  $stmt = $pdo_conn->prepare("INSERT INTO productos (nombre, descripcion, precio, imagen) VALUES (:nombre, :descripcion, :precio, :imagen)");
  $stmt->bindParam(':nombre', $nombre);
  $stmt->bindParam(':descripcion', $descripcion);
  $stmt->bindParam(':precio', $precio);
  $stmt->bindParam(':imagen', $imagen);
  $stmt->execute();

  echo json_encode(['success' => 'Producto creado correctamente']);

        }  elseif ($action === 'read') {
            $id = $_GET['id'];
            $stmt = $pdo_conn->prepare("SELECT * FROM productos WHERE id = :id");
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            $product = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($product) {
                echo json_encode(['product' => $product]);
            } else {
                echo json_encode(['error' => 'Producto no encontrado']);
            }
        } elseif ($action === 'update') {
            $id = $_POST['id'];
            $nombre = $_POST['nombre'];
            $descripcion = $_POST['descripcion'];
            $precio = $_POST['precio'];
            $imagen = ''; // lógica para manejar la imagen si es necesario

            if (isset($_FILES['imagenEdit']) && $_FILES['imagenEdit']['error'] === UPLOAD_ERR_OK) {
                $uploadDir = 'uploads/';
                if (!is_dir($uploadDir)) {
                    mkdir($uploadDir, 0755, true);
                }
                $uploadFile = $uploadDir . basename($_FILES['imagenEdit']['name']);
                if (move_uploaded_file($_FILES['imagenEdit']['tmp_name'], $uploadFile)) {
                    $imagen = $uploadFile;
                } else {
                    echo json_encode(['error' => 'Error al subir la imagen']);
                    exit;
                }
            } elseif (isset($_FILES['imagenEdit']) && $_FILES['imagenEdit']['error'] !== UPLOAD_ERR_NO_FILE) {
                echo json_encode(['error' => 'Error al subir la imagen']);
                exit;
            }

            $stmt = $pdo_conn->prepare("UPDATE productos SET nombre = :nombre, descripcion = :descripcion, precio = :precio, imagen = :imagen WHERE id = :id");
            $stmt->bindParam(':nombre', $nombre);
            $stmt->bindParam(':descripcion', $descripcion);
            $stmt->bindParam(':precio', $precio);
            $stmt->bindParam(':imagen', $imagen);
            $stmt->bindParam(':id', $id);
            $stmt->execute();
        
            echo json_encode(['success' => 'Producto actualizado correctamente']);
    
        } elseif ($action === 'delete') {
            $id = $_POST['id'];
        
            $stmt = $pdo_conn->prepare("DELETE FROM productos WHERE id = :id");
            $stmt->bindParam(':id', $id);
            $stmt->execute();
        
            echo json_encode(['success' => 'Producto eliminado correctamente']);
            
        } else {
            echo json_encode(['error' => 'Acción no válida']);
        }
        ?>
        