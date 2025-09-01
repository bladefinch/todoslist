import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import TodoList from "./todolist";
import '@testing-library/jest-dom'
import { Providers } from "../provider";

beforeEach(() => cleanup())

describe("TodoList", () => {
  test("добавляет новую задачу", () => {
    render(<Providers><TodoList /></Providers>);

    const input = screen.getByPlaceholderText("What needs to be done?");
    const addButton = screen.getByText("Add todo");

    fireEvent.change(input, { target: { value: "Купить хлеб" } });
    fireEvent.click(addButton);

    expect(screen.getByText("Купить хлеб")).toBeInTheDocument();
  });

  test("удаляет задачу", async() => {
    render(<Providers><TodoList /></Providers>);

    const input = screen.getByPlaceholderText("What needs to be done?");
    const addButton = screen.getByText("Add todo");

    fireEvent.change(input, { target: { value: "Помыть посуду" } });
    fireEvent.click(addButton);

    const completeMark = await screen.getAllByTestId("markascompleted");
    fireEvent.click(completeMark[0]);

    const deletetodo = await screen.getAllByText("Delete");
    fireEvent.click(deletetodo[0]);

    expect(screen.queryByText("Помыть посуду")).not.toBeInTheDocument();
  });

  test("Проверка списка невыполненных", async () => {
    render(<Providers><TodoList /></Providers>);

    const input = screen.getByPlaceholderText("What needs to be done?");
    const addButton = screen.getByText("Add todo");

    fireEvent.change(input, { target: { value: "Покормить кошку" } });
    fireEvent.click(addButton);

    const completeMark = await screen.getAllByTestId("markascompleted");
    fireEvent.click(completeMark[0]);

    const activeList = screen.getByText("Active");
    fireEvent.click(activeList);

    expect(screen.queryByText("Покормить кошку")).not.toBeInTheDocument();
  });

  test("Проверка списка выполненных", async () => {
    render(<Providers><TodoList /></Providers>);

    const input = screen.getByPlaceholderText("What needs to be done?");
    const addButton = screen.getByText("Add todo");

    fireEvent.change(input, { target: { value: "Купить молоко" } });
    fireEvent.click(addButton);

    const completeMark = await screen.getAllByTestId("markascompleted");
    fireEvent.click(completeMark[0]);

    const completedList = screen.getByText("Completed");
    fireEvent.click(completedList);

    expect(screen.queryByText("Купить молоко")).toBeInTheDocument();
  });
});