import { supabase } from "@/utils/supabase";

export async function fetchTodos(user: IUser) {
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .order("id", { ascending: false })
    .eq("created_by", user!.id);

  if (error) throw error;
  return data as ITodo[];
}

export async function createTodo(title: string) {
  const { data, error } = await supabase
    .from("todos")
    .insert([{ title: title, completed: false }])
    .select();

  if (error) throw error;
  return data as ITodo[];
}

export async function deleteTodo(id: number) {
  const { error } = await supabase.from("todos").delete().eq("id", id);
  if (error) throw error;
}
