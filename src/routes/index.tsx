import {routeLoader$, routeAction$, Form} from "@builder.io/qwik-city"
import {RequestContext, serialize} from "@mikro-orm/better-sqlite"
import type {DocumentHead} from "@builder.io/qwik-city"
import {component$} from "@builder.io/qwik"

import {getOrm} from "../lib/db/orm"

import {Todo} from "../db/entities"

import {TodoCard} from "../components/TodoCard"
import {Card} from "../components/Card"

export const useGetTodos = routeLoader$(async () => {
  const orm = await getOrm()

  return RequestContext
    .create(orm.em, async () => orm.em.find(Todo, {}, {
      orderBy: {
        updatedAt: "desc"
      }
    }))
    .then(todos => serialize(todos))
})

export const useCreateTodo = routeAction$(async input => {
  const orm = await getOrm()

  return RequestContext.create(orm.em, async () => {
    orm.em.create(Todo, input as unknown as {title: string}, {
      persist: true
    })

    await orm.em.flush()
  })
})

export const head: DocumentHead = {
  title: "Qwik To-do"
}

const TodoPage = component$(() => {
  const todos = useGetTodos()
  const addTodoAction = useCreateTodo()

  return (
    <div class="w-full p-5 flex flex-col gap-5 mobile:px-0 mobile:w-mobile mx-auto">
      <div class="text-3xl text-center">To-Do List</div>

      <div class="flex flex-col flex-1">
        <Card class="!p-0">
          <Form spaReset action={addTodoAction} class="flex flex-1 gap-2 w-full">
            <input
              autoFocus
              required
              type="text"
              name="title"
              class="flex flex-1 pl-5 outline-none"
              placeholder="What would you do?"
            />

            <button class="pr-5 py-5" type="submit">➕</button>
          </Form>
        </Card>

        <ul class="flex flex-1 flex-col gap-2">
          {todos.value.map(todo => (
            <li key={todo.id} class="flex flex-row">
              <TodoCard todo={todo} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
})

export default TodoPage
