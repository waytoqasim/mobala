import React from "react";

export default function  TableROWMC(){
    return(
        <>
            <tr className="tableheading">
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Details</th>
                    <th scope="col">Country</th>
                    <th scope="col">Province</th>
                    <th scope="col">City</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Activity</th>
                    <th scope="col" style={{ whiteSpace: "nowrap" }}>
                        Direct Order
                    </th>
                    <th scope="col">Serviced Countries</th>
                    <th scope="col">Licenses</th>
                    <th scope="col">Website</th>
                    <th scope="col">Settlement Services</th>
                    <th scope="col">Favorite</th>
                    <th scope="col">Docs</th>
                    <th scope="col">Notes</th>
                  </tr>
        </>
    )
}