import { Dialog, DialogPanel, DialogTitle, Button } from "@headlessui/react";
import { useForm } from "react-hook-form";

export default function StaffModal({ isOpen, close, title, fields, onConfirm, initialData }) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: initialData || {
      name: "",
      email: "",
      phone: "",
      photo: "",
      password: "",
    },
  });

  const submitForm = (data) => {
    // photo file handle
    if (data.photo && data.photo[0]) {
      data.photo = URL.createObjectURL(data.photo[0]); // preview URL (later backend upload)
    }
    onConfirm(data);
    reset();
    close();
  };

  return (
    <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
          >
            <DialogTitle as="h3" className="text-lg font-bold text-gray-800 mb-4">
              {title}
            </DialogTitle>

            <form onSubmit={handleSubmit(submitForm)}>
              {fields.map((field) => (
                <div key={field} className="mb-3">
                  <label className="block text-sm font-medium capitalize mb-1">{field}</label>
                  <input
                    type={field === "password" ? "password" : field === "photo" ? "file" : "text"}
                    {...register(field, { required: true })}
                    className="border px-3 py-2 rounded w-full"
                  />
                </div>
              ))}

              <div className="flex justify-end gap-3 mt-4">
                <Button
                  type="button"
                  onClick={close}
                  className="bg-gray-400 px-4 py-2 rounded text-white hover:bg-gray-600"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-700"
                >
                  Confirm
                </Button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}