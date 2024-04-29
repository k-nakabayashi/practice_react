import { render, screen } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import { TopPage } from "@/pages/index";

describe("TopPageテスト", () => {
  it("buttonタグがレンダリングされる", () => {
    render(<BrowserRouter><TopPage /></BrowserRouter>);
    const element = screen.getByRole("button");
    expect(element).toBeInTheDocument(); // buttonタグがレンダリングされる
    expect(element).toHaveTextContent("送信"); //ラベルが表示されているか
  });
});

