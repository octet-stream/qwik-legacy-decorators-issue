import {RequestContext} from "@mikro-orm/better-sqlite"
import {globalAction$} from "@builder.io/qwik-city"
import {component$, $} from "@builder.io/qwik"

import {getOrm} from "../lib/db/orm"
import {Todo} from "../db/entities"

import {Card} from "./Card"

interface Props {
  todo: Pick<Todo, keyof Todo> // Qwik breaks with classes
}

export const useRemoveTodo = globalAction$(async (input, {fail}) => {
  const orm = await getOrm()

  return RequestContext.create(orm.em, async () => {
    const {id} = (input as unknown as {id: string})

    const todo = await orm.em.findOne(Todo, id)

    if (!todo) {
      return fail(404, {
        message: "Todo could not be found"
      })
    }

    await orm.em.removeAndFlush(todo)
  })
})

export const TodoCard = component$<Props>(({todo}) => {
  const deleteAction = useRemoveTodo()

  const onClick = $(() => deleteAction.submit({id: todo.id}))

  return (
    <Card>
      <div class="flex flex-1">{todo.title}</div>

      <button type="button" onClick$={onClick}>🗑️</button>
    </Card>
  )
})
