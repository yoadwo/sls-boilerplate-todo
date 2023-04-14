import { DocumentClient } from "aws-sdk/clients/dynamodb";
import Todo from "../model/Todo";

export default class TodoServerice {

    private Tablename: string = "TodosTable";

    constructor(private docClient: DocumentClient) { }

    async getAllTodos(): Promise<Todo[]> {
        const todos = await this.docClient.scan({
            TableName: this.Tablename,
        }).promise()
        return todos.Items as Todo[];
     }

     async createTodo(todo: Todo): Promise<Todo> {
        await this.docClient.put({
            TableName: this.Tablename,
            Item: todo
        }).promise()
        return todo as Todo;
    }

    async getTodo(id: string): Promise<any> {
        const todo = await this.docClient.get({
            TableName: this.Tablename,
            Key: {
                todosId: id
            }
        }).promise()
        if (!todo.Item) {
            throw new Error("Id does not exit");
        }
        return todo.Item as Todo;
    }

    async updateTodo(id: string, todo: Partial<Todo>): Promise<Todo> {
        let updateExp = "SET ";
        let noChanges = true;
        if (todo.status) {
            updateExp += "#status = :status, ";
            noChanges = false;
        }
        if (todo.title) {
            updateExp += "#title = :title, ";
            noChanges = false;
        }
        if (todo.description) {
            updateExp += "#description = :description, ";
            noChanges = false;
        }

        if (noChanges){
            return;
        }

        const updated = await this.docClient
            .update({
                TableName: this.Tablename,
                Key: { todosId: id },
                UpdateExpression:
                    updateExp,                    
                ExpressionAttributeNames: {
                    "#status": "status",
                    "#title": "title",
                    "#description": "description",
                },
                ExpressionAttributeValues: {
                    ":status": todo.status,
                    ":title": todo.title,
                    ":description": todo.description,
                },
                ReturnValues: "ALL_NEW",
            })
            .promise();
        return updated.Attributes as Todo;
    }

    async deleteTodo(id: string):Promise<any> {
        return await this.docClient.delete({
            TableName: this.Tablename,
            Key: {
                todosId: id
            }
        }).promise();
    }
}