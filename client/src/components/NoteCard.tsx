import { trpc } from "../trpc";

interface Props {
  note: {
    _id: string;
    title: string;
    description: string;
    done: boolean;
  };
}

function NoteCard({ note }: Props) {
  const deleteNote = trpc.note.delete.useMutation();
  const toggleDoneNote = trpc.note.toggleDone.useMutation();
  const utils = trpc.useUtils();
  return (
    <div className="bg-zinc-800 p-2 mb-2 flex justify-between">
      <div>
        <h1 className="font-bold text-xl">{note.title}</h1>
        <p>{note.description}</p>
      </div>
      <div className="flex gap-x-2">
        <button
          onClick={() => {
            deleteNote.mutate(note._id, {
              onSuccess: (data) => {
                if (data) {
                  utils.note.get.invalidate();
                }
              },
              onError: (error) => {
                console.log(error);
              },
            });
          }}
          className="bg-red-500 px-3 py-2 text-white rounded-md ml-auto"
        >
          Delete
        </button>
        <button
          onClick={async () => {
            await toggleDoneNote.mutate(note._id, {
              onSuccess(data) {
                if (data) {
                  utils.note.get.invalidate();
                }
              },
            });
          }}
          className={`px-3 py-2 text-white rounded-md ml-auto ${
            note.done ? "bg-zinc-500" : "bg-green-500"
          }`}
        >
          {note.done ? "UnDone" : "Done"}
        </button>
      </div>
    </div>
  );
}

export default NoteCard;
