import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { success, error } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import todosService from '../../service'
import CreateSchemaSchema from '../../model/Todo-create-schema';
import TodoUpdateSchema from '../../model/Todo-update-schema';
import type { FromSchema } from "json-schema-to-ts";
import { v4 } from "uuid";

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }

export const getAllTodos = middyfy(async (): Promise<APIGatewayProxyResult> => {
    try {
        const todos = await todosService.getAllTodos();
        return success({
            todos
        })
    } catch (e){
        console.error(e);
        return error({code: e.code, message: e.message})
    }
})

export const createTodo = middyfy(async (event: ValidatedAPIGatewayProxyEvent<typeof CreateSchemaSchema>): Promise<APIGatewayProxyResult> => {
    try {
        const id = v4();
        const todo = await todosService.createTodo({
            todosId: id,
            title: event.body.title,
            description: event.body.description,
            createdAt: new Date().toISOString(),
            status: false
        })
        return success({
            todo
        });
    } catch (e) {
        console.error(e);
        return error({code: e.code, message: e.message})
    }
})

export const getTodo = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    try {
        const todo = await todosService.getTodo(id)
        return success({
            todo, id
        });
    } catch (e) {
        console.error(e);
        return error({code: e.code, message: e.message})
    }
})

export const updateTodo = middyfy(async (event: ValidatedAPIGatewayProxyEvent<typeof TodoUpdateSchema>): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    console.log("todo values: ", event.body)
    try {
        const todo = await todosService.updateTodo(id, event.body)
        const returned = todo ? todo : event.body;
        return success({
            returned, id
        });
    } catch (e) {
        console.error(e);
        return error({code: e.code, message: e.message})
    }
})

export const deleteTodo = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    try {
        const todo = await todosService.deleteTodo(id)
        return success({
            todo, id
        });
    } catch (e) {
        console.error(e);
        return error({code: e.code, message: e.message})
    }
})