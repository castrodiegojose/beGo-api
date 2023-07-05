# beGo-api
BeGo Challenge

Hola! 

_La funcionalidad de esta API esta enfocada a la creación de ordenes principalmente. 
Al crear una orden los primeros pasos son asignar una ruta existente, caso  contrario crear una, siempre y cuando haya camiones disponibles. 
Se pueden crear varias ordenes sobre una misma ruta existente.

_Se crearon 3 tipos de ordenes:
{
   "Standard" : Orden Comun
   "Express" : Orden Express
   "Custom" : Orden customizada( puerta a puerta) 
} 

_Los estados de las Ordenes son: 
{
    "Taken": Tomada, recibida
    "In_Progress": En progreso
    "Completed": Completada
    "Cancelled": Cancelada
}

_Los parametros son estrictos al momento de enviar los mismos.

_Ejemplo de parametros de ingreso a la hora de crear una Orden:

{
    "type": "Custom",
    "description":"Box",
    "pickup": "Cristo Redentor, Las Heras, Mendoza",
    "dropoff": "Puerto Madero, CABA"
}

_Al momento de crear la orden por defecto se ingresa el parametro "Taken" en status. 
El mismo puede ser actualizado (salvo en el caso de que se intente modificar un  estado "In_Progress").
