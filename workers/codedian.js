// Importar los módulos necesarios de la biblioteca camunda-external-task-client-js
import { Client, Variables, logger } from "camunda-external-task-client-js";

// Objeto de configuración para el Cliente de Tareas Externas de Camunda
const config = { baseUrl: "http://localhost:8080/engine-rest", use: logger };

// Crear una instancia del Cliente de Tareas Externas de Camunda con la configuración especificada
const client = new Client(config);

// Suscribirse al tipo de tarea "SendLetter" y definir la función a ejecutar cuando se recibe una tarea
client.subscribe("codeAssignment", async function({ task, taskService }) {

  // Obtener el valor de las variables "customerservice" y "productsatisfaction" de las variables de la tarea

  const fname = task.variables.get("name");
  const surname = task.variables.get("surname");
  const cc = task.variables.get("cc");

  // Concatenar nombre
  const name = fname + surname;
  console.log("nombres: " + name );

  // Concatenar para código especial
  const diancode = name + cc;
  
  // Registrar el resultado
  console.log("La cadena concatenada es: " + diancode );

  // Crear un objeto Variables para almacenar variables del proceso
  const processVariables = new Variables();
  
  // Establecer la variable "austriaResponse" con el mensaje de respuesta preparado
  processVariables.set("DIANCode",diancode);
  
  // Completar la tarea, proporcionando las variables del proceso
  await taskService.complete(task, processVariables);
});
