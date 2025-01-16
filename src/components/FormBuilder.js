import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const FormBuilder = () => {
  const [fields, setFields] = useState([]);

  // Add a new field
  const addField = (type) => {
    setFields([
      ...fields,
      { id: Date.now().toString(), type, label: `New ${type} Field` },
    ]);
  };

  // Handle drag-and-drop reorder
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedFields = Array.from(fields);
    const [movedField] = reorderedFields.splice(result.source.index, 1);
    reorderedFields.splice(result.destination.index, 0, movedField);

    setFields(reorderedFields);
  };

  // Remove a field
  const removeField = (id) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  return (
    <div className="flex min-h-screen p-4 bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/4 bg-white p-4 shadow-md">
        <h2 className="text-xl font-bold mb-4">Add Fields</h2>
        <button
          onClick={() => addField("Text")}
          className="w-full px-4 py-2 mb-2 bg-blue-500 text-white rounded"
        >
          Add Text Field
        </button>
        <button
          onClick={() => addField("Number")}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Number Field
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <h2 className="text-xl font-bold mb-4">Form Preview</h2>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="formFields">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-4"
              >
                {fields.map((field, index) => (
                  <Draggable key={field.id} draggableId={field.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="p-4 bg-white border rounded shadow"
                      >
                        <div className="flex justify-between items-center">
                          <span>{field.label}</span>
                          <button
                            onClick={() => removeField(field.id)}
                            className="px-2 py-1 bg-red-500 text-white rounded"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </main>
    </div>
  );
};

export default FormBuilder;
