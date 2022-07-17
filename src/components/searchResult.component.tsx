import { h, JSX } from 'preact';

export default function SearchResultComponent({ data }): JSX.Element {
  return data.length > 0 ? (
    <table>
      <tr>
        <th>Hotel Name</th>
        <th>Price Per Person</th>
        <th>Hotel Facilities</th>
        <th>Star Rating</th>
      </tr>
      {data.map((item, i) => (
        <tr>
          <td test-id="hotelFacilities">{item.hotel.name}</td>
          <td test-id="pricePerPerson">£{item.pricePerPerson}</td>
          <td test-id="hotelFacilities">{item.hotel.content.hotelFacilities.toString()}</td>
          <td test-id="starRating">{item.hotel.content.starRating}</td>
        </tr>
      ))}
    </table>
  ) : null;
}
