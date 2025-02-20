project/
│
├── src/
│   ├── app.mjs                 # Punto de configuracion de la aplicación
│   ├── index.mjs               # Punto de entrada de la aplicación
│   ├── routes/                # Carpeta para definir rutas de la API
│   │   ├── index.mjs           # Archivo de enrutador principal
│   │   ├── users.mjs           # Rutas relacionadas con usuarios
│   │   ├── products.mjs        # Rutas relacionadas con productos
│   │   └── ...
│   ├── controllers/           # Carpeta para controladores de la API
│   │   ├── usersController.mjs # Controladores relacionados con usuarios
│   │   ├── productsController.mjs # Controladores relacionados con productos
│   │   └── ...
│   ├── models/                # Carpeta para definir modelos de datos
│   │   ├── user.mjs            # Modelo de usuario
│   │   ├── product.mjs         # Modelo de producto
│   │   └── ...
│   ├── middleware/            # Carpeta para middleware personalizado
│   │   ├── authentication.mjs  # Middleware de autenticación
│   │   ├── authorization.mjs   # Middleware de autorización
│   │   └── ...
│   ├── config/                # Carpeta para configuraciones de la aplicación
│   │   ├── database.mjs        # Configuración de la base de datos
│   │   ├── helmet.mjs          # Configuración de la seguiridad de la API REST
│   │   └── swagger.mjs         # Archivo .mjs con la especificación de Swagger
│   ├── helpers/               # Carpeta para funciones de ayuda (helpers)
│   │   ├── utility.mjs         # Funciones de utilidad
│   │   ├── validation.mjs      # Funciones de validación
│   │   └── ...
│   ├── businessRules/        # Carpeta para reglas de negocio
│   │   ├── userRules.mjs       # Reglas de negocio relacionadas con usuarios
│   │   ├── productRules.mjs    # Reglas de negocio relacionadas con productos
│   │   └── ...
│   ├── logs/                  # Carpeta para archivos de registro
│   │   ├── error.log          # Registro de errores
│   │   ├── access.log         # Registro de acceso
│   │   └── ...
│   ├── scripts/               # Carpeta para scripts personalizados
│   │   ├── db-migration.mjs    # Script de migración de base de datos
│   │   ├── data-import.mjs     # Script para importar datos
│   │   └── ...
│   ├── public/                # Carpeta para archivos estáticos
│   │   ├── images/            # Imágenes
│   │   ├── css/               # Hojas de estilo
│   │   ├── js/                # Scripts de cliente
│   │   └── ...
│   └── tests/                 # Carpeta para pruebas
│       ├── unit/              # Pruebas unitarias
│       ├── integration/       # Pruebas de integración
│       └── ...
│   
├── package.mjson               # Archivo de configuración de npm
├── README.md                  # Documentación general del proyecto
└── .gitignore                 # Archivo de configuración de gitignore
