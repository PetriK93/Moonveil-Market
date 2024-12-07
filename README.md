# Moonveil-Market

Fantasy RPG themed marketplace. Features an auction house and profile creation to authenticate users. React together with Javascript is responsible for the frontend and MySQL, Node and Express will be responsible for the backend.

This is the initial view of the site. You will need to log in or register an account to gain access to the auction house. Authentication and security is handled by jwt and bcrypt.
![LOGIN](https://github.com/user-attachments/assets/34b1daac-d04e-431f-88c6-af1309e3f9a7)
![REGISTER](https://github.com/user-attachments/assets/fb8938cd-2ae7-4221-8b7b-71297cc0cea1)
Once you are logged in, the backend will create two secure HttpOnly jwt tokens. An access token and a refresh token. React will also make sure that the cookies are not lost on page reload.

![AH1](https://github.com/user-attachments/assets/7319f7b6-55c4-4409-a66a-948e2facccee)
Auction house has three tabs, "browse", "sell" and "myAuctions". "browse" section will showcase all the items that you want to buy. "sell" section will let you pick an item of your choice to sell from your inventory.
"myAuctions" section contains a list of all the items that you have put up for sale.
![AH2](https://github.com/user-attachments/assets/9aa5e651-4682-41e3-b2dd-bbb0d559f7c0)
Project is still under construction..

Dependencies are still subject to change. Currently working on the backend side of things.
