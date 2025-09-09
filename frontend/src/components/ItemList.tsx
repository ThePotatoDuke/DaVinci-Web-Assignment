import { PlusCircleIcon, TrashIcon } from "@heroicons/react/16/solid";

interface InputField {
  name: string; // key of the field
  placeholder?: string;
  value: string | number;
  type?: "text" | "number";
}

interface ItemListProps<T> {
  title: string;
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  inputFields: InputField[];
  onChange: (fieldName: string, value: string | number) => void;
  onAdd: () => void;
  onDelete: (id: number) => void;
}

export function ItemList<T extends { id: number }>({
  title,
  items,
  renderItem,
  inputFields,
  onChange,
  onAdd,
  onDelete,
}: ItemListProps<T>) {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-900 text-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-extrabold mb-6 text-indigo-400">{title}</h2>

      {/* Inputs + Add button */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {inputFields.map((field) => (
          <input
            key={field.name}
            type={field.type || "text"}
            value={field.value}
            onChange={(e) =>
              onChange(
                field.name,
                field.type === "number"
                  ? Number(e.target.value)
                  : e.target.value
              )
            }
            placeholder={field.placeholder || `Enter ${field.name}...`}
            className="flex-1 min-w-[150px] border border-gray-700 bg-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        ))}

        <button
          onClick={onAdd}
          className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Add {title.slice(0, -1)}
          <PlusCircleIcon className="h-5 w-5" />
        </button>
      </div>

      {/* List items */}
      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center bg-gray-800 px-4 py-3 rounded-xl shadow-md hover:bg-gray-700 transition"
          >
            {renderItem(item)}
            <button
              onClick={() => onDelete(item.id)}
              className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
            >
              Delete
              <TrashIcon className="h-5 w-5" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
