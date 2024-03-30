document.addEventListener("DOMContentLoaded", function () {
    let tableBody = document.getElementById("tableBody");

    let data = async function () {
        let req = await fetch("https://jsonplaceholder.typicode.com/users");
        let res = await req.json();
        return res;
    };

    data().then((data) => {
        data.forEach((element) => {
            let tableRow = document.createElement("tr");

            // Create and append table columns
            let columns = ["id", "name","username","email"];
            columns.forEach((column) => {
                let tableColumn = document.createElement("td");
                tableColumn.textContent = `${element[column]}`;
                tableRow.appendChild(tableColumn);
            });

            // Create the button container
            let columnBtn = document.createElement("td");

            // Create and append the "edit" button
            let editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.classList.add("btn");
            columnBtn.appendChild(editButton);

            // Create and append the "delete" button
            let deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.classList.add("btn");
            columnBtn.appendChild(deleteButton);

            // Append the button container to the table row
            tableRow.appendChild(columnBtn);

            editButton.addEventListener("click", () => {
                alert("Edit button clicked! Implement your edit logic here.");
   
                // You can add your edit logic here
            });

            deleteButton.addEventListener('click', async function () {
                var confirmed = confirm('Are you sure you want to delete?');

                if (confirmed) {
                    // Perform delete operation here
                    let deleteReq = await fetch(`https://jsonplaceholder.typicode.com/users/${element.id}`, {
                        method: 'DELETE',
                    });

                    if (deleteReq.ok) {
                        // If the deletion was successful, remove the row from the table
                        tableBody.removeChild(tableRow);
                        // alert('Item deleted!');
                    } else {
                        // If the deletion was not successful, display an error message
                        alert('Error deleting item.');
                    }
                } else {
                    alert('Deletion canceled.');
                }
            });

            // Append the table row to the table body
            tableBody.appendChild(tableRow);
        });
    });
});