# Food-Meal-App
<!-- Header consists of logos which are animated and assosciated pages links and communication links -->
    <!-- Flow of pages -->
    <!-- default data is displayed in "home page" which is fetched from api  -->
    <!-- if you search something in the input it will give you suggestions eg search chicken -->
    <!-- if you press search button it will take you to "navigation page" where your searched items will be displayed-->
    <!-- if input is empty or white spaces, and you hit search button, "please enter your dish" gif will be displayed -->
    <!-- if you add items from the home page it will increment cart value and changes are reflected in count -->
    <!-- for storing cart count, "local storage" is used so from your navigation page even if you add items count is reflected-->
    <!-- if you go to "favourites" page a list of your added items will be displayed -->
    <!-- each item in favourites page will have "delete button" and when you hit that button item will be removed and count is "decresed"-->
    <!-- from favourites page if you click on particular item it will take you to "about page" where the information about that dish will be there -->
    <!-- if you click on "populars" it will navigate to "desi food" section of same home page -->
    <!-- if you click on "contact" it will navigate to footer of that particular page -->
for input suggestions, i created default items contained array. actually the items in array should be of api data as the api is not default one i.e.containing default items for every search i have to create a default array items. so if the searched input first letter matches to first letter of any array items, suggestions will be there and if you click on that suggestion input value is updated with that suggestion value.

i used bootstrap to style the each product i.e used image product in bootstrap and to footer to display drop downs for country and languages.
    
    favourite page
If you go to favourites page all of your added items from "home page" and "navigation page" will be displayed there.
i used local storage to store all added items "id"s from api data and so with those ids getting them at favourite page fetched data through their ids.
the cart count  displayed is local storage stored array length.
some background color animation added to title of page.
header and footer are same except stirfry gif in header.
there are delete buttons for each product. i fetched local storage meal id array which i used to store ids of added items and filtered it so that the particular clicked item will not contain in the filtered array. with that filtered array,i removed present local storage mealid and replaced it with same name and filtered array as there is no process to update or splice the local storage array.

  About page
  
from favourite section, if you click on particular image,page will be navigated to about page where the information about that dish will be displayed.
i have created separate local storage string to store that clicked item product in favourites page and using that id i displayed all the details about that clicked dish.
 
