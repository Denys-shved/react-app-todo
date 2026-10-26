// const URL = "http://localhost:3001/tasks"

// const headers = {
//     'Content-Type': 'application/json'
// }

// const tasksAPI = {
//     getAll: () => {
//         return fetch(URL)
//         .then((response)=>response.json())
//     },

//     add: (task) => {
//         fetch(URL, {
//             method: 'POST',
//             headers,
//             body: JSON.stringify(task)}
//             )
//             .then((response)=>response.json())
//     },

//     delete: (id) => {
//         return fetch(`URL/${id}`, {
//             method: 'DELETE'
//         })
//     },

//     deleteAll: (tasks) => {
//         return Promise.all(
//                 tasks.map(({id})=>{
//                     tasksAPI.delete(id)
//                 })
//             )
//     },

//     toggleComplete: (id, isDone) => {
//         return fetch(`URL/${id}`, {
//             method: 'PATCH',
//             headers,
//             body: JSON.stringify({isDone})
//         })
//     }
// }

// export default tasksAPI



const URL = "http://localhost:3001/tasks";

export type Task = {
    id: string;
    title: string;
    isDone: boolean;
};

type NewTask = Omit<Task, "id">;

const headers = {
    "Content-Type": "application/json",
};

const checkResponse = (response: Response) => {
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    return response;
};

const tasksAPI = {
    getAll: async (): Promise<Task[]> => {
        const response = await fetch(URL);
        await checkResponse(response);

        return response.json() as Promise<Task[]>;
    },

    getById: async (id: string): Promise<Task> => {
        const response = await fetch(`${URL}/${id}`);
        await checkResponse(response);

        return response.json() as Promise<Task>;
    },

    add: async (task: NewTask): Promise<Task> => {
        const response = await fetch(URL, {
            method: "POST",
            headers,
            body: JSON.stringify(task),
        });

        await checkResponse(response);

        return response.json() as Promise<Task>;
    },

    delete: async (id: string): Promise<void> => {
        const response = await fetch(`${URL}/${id}`, {
            method: "DELETE",
        });

        await checkResponse(response);
    },

    deleteAll: async (tasks: Task[]): Promise<void> => {
        await Promise.all(
            tasks.map(({ id }) => tasksAPI.delete(id))
        );
    },

    toggleComplete: async (
        id: string,
        isDone: boolean
    ): Promise<void> => {
        const response = await fetch(`${URL}/${id}`, {
            method: "PATCH",
            headers,
            body: JSON.stringify({ isDone }),
        });

        await checkResponse(response);
    },
};

export default tasksAPI;
