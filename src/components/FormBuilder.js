import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const FormBuilder = () => {
  const [rows, setRows] = useState([
    { id: "row-1", columns: [] }, // Default single row
  ]);

  // Add a new row
  const addRow = () => {
    setRows([...rows, { id: `row-${Date.now()}`, columns: [] }]);
  };

  // Add a new field to the first row by default
  const addField = (type) => {
    const newField = {
      id: Date.now().toString(),
      type,
      label: `New ${type} Field`,
      config: {
        placeholder: `Enter ${type}`,
        required: false,
      },
    };

    // Add to the first row for simplicity
    const updatedRows = [...rows];
    updatedRows[0].columns.push(newField);
    setRows(updatedRows);
  };

  // Handle drag and drop
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const [sourceRowIndex, sourceFieldIndex] = result.source.droppableId.split("-");
    const [destinationRowIndex, destinationColumnIndex] =
      result.destination.droppableId.split("-");

    const sourceRow = rows[sourceRowIndex];
    const sourceField = sourceRow.columns[sourceFieldIndex];
    const updatedSourceColumns = [...sourceRow.columns];
    updatedSourceColumns.splice(sourceFieldIndex, 1);

    const destinationRow = rows[destinationRowIndex];
    const updatedDestinationColumns = [...destinationRow.columns];
    updatedDestinationColumns.splice(destinationColumnIndex, 0, sourceField);

    const updatedRows = [...rows];
    updatedRows[sourceRowIndex].columns = updatedSourceColumns;
    updatedRows[destinationRowIndex].columns = updatedDestinationColumns;

    setRows(updatedRows);
  };

  // Render field preview
  const renderField = (field) => {
    const { type, label, config } = field;

    switch (type) {
      case "text":
      case "email":
      case "tel":
        return (
          <div>
            <label className="block font-medium">{label}</label>
            <input
              type={type}
              placeholder={config.placeholder}
              required={config.required}
              className="w-full p-2 border rounded mt-1"
            />
          </div>
        );

      case "textarea":
        return (
          <div>
            <label className="block font-medium">{label}</label>
            <textarea
              placeholder={config.placeholder}
              required={config.required}
              className="w-full p-2 border rounded mt-1"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-4 bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/4 bg-white p-4 shadow-md mb-4">
        <h2 className="text-xl font-bold mb-4">Add Fields</h2>
        <button
          onClick={() => addField("text")}
          className="w-full px-4 py-2 mb-2 bg-blue-500 text-white rounded"
        >
          Add Text Field
        </button>
        <button
          onClick={() => addField("email")}
          className="w-full px-4 py-2 mb-2 bg-blue-500 text-white rounded"
        >
          Add Email Field
        </button>
        <button
          onClick={() => addRow()}
          className="w-full px-4 py-2 bg-green-500 text-white rounded"
        >
          Add Row
        </button>
      </aside>

      {/* Form Preview */}
      <main className="flex-1">
        <h2 className="text-xl font-bold mb-4">Form Preview</h2>
        <DragDropContext onDragEnd={handleDragEnd}>
          {rows.map((row, rowIndex) => (
            <div key={row.id} className="grid grid-cols-2 gap-4 mb-4">
              <Droppable droppableId={`${rowIndex}`}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="bg-white p-4 shadow border rounded"
                  >
                    {row.columns.map((field, columnIndex) => (
                      <Draggable
                        key={field.id}
                        draggableId={`${field.id}`}
                        index={columnIndex}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="p-4 border rounded shadow mb-2"
                          >
                            {renderField(field)}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </DragDropContext>
      </main>
    </div>
  );
};

export default FormBuilder;
