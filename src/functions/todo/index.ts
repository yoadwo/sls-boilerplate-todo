import { handlerPath } from '@libs/handler-resolver';
import CreateSchemaSchema from '../../model/Todo-create-schema';
import TodoUpdateSchema from '../../model/Todo-update-schema';

export const getAllTodos = {
    handler: `${handlerPath(__dirname)}/handlers.getAllTodos`,
    events: [
        {
            http: {
                method: 'get',
                path: 'todo/',
            },
        },
    ],
};

export const createTodo = {
    handler: `${handlerPath(__dirname)}/handlers.createTodo`,
    events: [
        {
            http: {
                method: 'post',
                path: 'todo',
                request: {
                    schemas: {
                      'application/json': CreateSchemaSchema,
                    },
                },
            },
        },
    ],
};

export const getTodo = {
    handler: `${handlerPath(__dirname)}/handlers.getTodo`,
    events: [
        {
            http: {
                method: 'get',
                path: 'todo/{id}',
            },
        },
    ],
};

export const updateTodo = {
    handler: `${handlerPath(__dirname)}/handlers.updateTodo`,
    events: [
        {
            http: {
                method: 'put',
                path: 'todo/{id}',
                request: {
                    schemas: {
                      'application/json': TodoUpdateSchema,
                    },
                },
            },
        },
    ],
};

export const deleteTodo = {
    handler: `${handlerPath(__dirname)}/handlers.deleteTodo`,
    events: [
        {
            http: {
                method: 'delete',
                path: 'todo/{id}',
            },
        },
    ],
};