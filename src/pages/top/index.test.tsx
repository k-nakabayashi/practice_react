// import { screen,render, fireEvent, waitFor} from "@testing-library/react";
// import { BrowserRouter } from 'react-router-dom';
// import { TopPage, useSubmit } from "@/pages/index";

// describe("TopPageテスト", () => {

//   it("ボタンをクリックする", async () => {
//     const submit = useSubmit()
//     render(<BrowserRouter><TopPage callback={submit}/></BrowserRouter>);

//     const input = screen.getByRole("textbox");    
//     fireEvent.change(input, { target: { value: "test" } });

//     const form = screen.getByTestId("jst-Form");


//     await waitFor(() => {
//       try {
//         // TODO: できない。どうもsubmiをモックで作る必要がありそう。それはそれで意義を感じない。
//         // →カスタムフックにしてテストできるか？
//         fireEvent.submit(form);
//       } catch (error) {
//         console.log("kokoo")
//         console.log(error)
//       }
//     });

//   });
// });


