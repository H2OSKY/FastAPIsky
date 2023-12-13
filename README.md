# FastAPIsky CRUD

Este proyecto implementa un API CRUD básica con FastAPI, SQLAlchemy, jinja y bases de datos SQLite.

## Requisitos

- Python 3.7+
- FastAPI
- SQLAlchemy
- Jinja 2
- Databases (SQLite)
- Uvicorn (para ejecutar el servidor de desarrollo)

## Instalación

1. Clona este repositorio
    ```
    git clone https://github.com/H2OSKY/FastAPIsky.git 
    ```

2. Crea un entorno virtual
    ```
    python -m venv fastapi-venv
    ```
3. Activa el entorno virtual
    ```
    fastapi-venv\Scripts\activate
    ```
4. Instala las dependencias en el entorno virtual
    ```
    pip install fastapi
    pip install "uvicorn[standard]"
    pip install python-multipart sqlalchemy jinja2
    ```
5. Inicia el servidor de desarrollo
    ```
    uvicorn main:app --reload --host 0.0.0.0 --port 8000
    ```

6. Visita http://localhost:8000 en tu navegador  

## Uso

La aplicación provee las siguientes rutas:  

- `GET /` - Página de inicio que muestra todos los usuarios
- `GET /addnew` - Formulario para crear un nuevo usuario  
- `POST /add` - Endpoint para agregar un nuevo usuario
- `GET /get_item/{user_id}` - Obtiene un usuario por ID 
- `PUT /update/{user_id}` - Actualiza un usuario existente
- `DELETE /delete/{user_id}` - Elimina un usuario
