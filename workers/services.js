// Importar los módulos necesarios de la biblioteca camunda-external-task-client-js
import { Client, Variables, logger } from "camunda-external-task-client-js";

// Objeto de configuración para el Cliente de Tareas Externas de Camunda
const config = { baseUrl: "http://localhost:8080/engine-rest", use: logger };

// Crear una instancia del Cliente de Tareas Externas de Camunda con la configuración especificada
const client = new Client(config);

// Suscribirse al tipo de tarea "SendLetter" y definir la función a ejecutar cuando se recibe una tarea
client.subscribe("calculateporcent", async function({ task, taskService }) {

  // Obtener el valor de las variables "customerservice" y "productsatisfaction" de las variables de la tarea
  const customerServiceRating = parseInt(task.variables.get("customerservice"), 10);
  const productSatisfactionRating = parseInt(task.variables.get("productsatisfaction"), 10);

  // Realizar la suma de las calificaciones
  const totalRating = customerServiceRating + productSatisfactionRating;

  // Multiplicar el resultado por 10
  const finalScore = totalRating * 10;
  
  // Registrar el resultado
  console.log("El porcentaje de satisfación es: " + finalScore + "%");

  // Resto del código...

  // Preparar un mensaje de respuesta para Austria
  
  // Crear un objeto Variables para almacenar variables del proceso
  const processVariables = new Variables();
  
  // Establecer la variable "austriaResponse" con el mensaje de respuesta preparado
  processVariables.set("p",finalScore + "%" );
  
  // Completar la tarea, proporcionando las variables del proceso
  await taskService.complete(task, processVariables);
});
