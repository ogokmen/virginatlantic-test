import { h, JSX } from 'preact';
import { useRouter } from 'preact-router';
import { useEffect, useState } from 'preact/hooks';
import SearchComponent from '../components/search.component';
import FilterComponent from '../components/filter.component';
import SearchResultComponent from '../components/searchResult.component';
import { doRequest } from '../services/http.service';
import { BookingRequest, BookingResponse } from '../types/booking';
import { DateTime } from 'luxon';

const filtersDefault = { facility: null, starRating: null, pricePerPerson: null };

export default function ResultsRoute(): JSX.Element {
  const [searchParams] = useRouter();
  const [allResponse, setAllResponse] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [filters, setFilters] = useState(filtersDefault);

  useEffect(() => {
    const departureDate = DateTime.fromFormat(searchParams?.matches?.departureDate, 'yyyy-MM-dd').toFormat('dd-MM-yyyy');
    const requestBody: BookingRequest = {
      bookingType: 'holiday',
      location: searchParams?.matches?.location,
      departureDate: departureDate,
      duration: searchParams?.matches?.duration as unknown as number,
      gateway: 'LHR',
      partyCompositions: [
        {
          adults: searchParams?.matches?.adults as unknown as number,
          childAges: [],
          infants: 0,
        },
      ],
    };

    doRequest('POST', '/cjs-search-api/search', requestBody).then((response: unknown | BookingResponse) => {
      // Results are loaded here
      setFilteredData(null);
      setFilters(filtersDefault);
      setAllResponse(response.holidays);

      console.log({ allResponse: response.holidays });
    });
  }, [searchParams]);

  const onFilterChange = ({ facility, starRating, ...props }) => {
    const pricePerPerson = props.pricePerPerson == '' ? null : JSON.parse(props.pricePerPerson);
    console.log(pricePerPerson);
    const list = [];

    allResponse.forEach((holiday) => {
      let addHoliday = true;

      if (facility && !(holiday.hotel.content.hotelFacilities.indexOf(facility) > -1)) addHoliday = false;
      if (pricePerPerson && !(holiday.pricePerPerson >= pricePerPerson?.min && holiday.pricePerPerson <= pricePerPerson?.max)) addHoliday = false;
      if (starRating && holiday.hotel.content.starRating !== starRating) addHoliday = false;

      if (addHoliday) list.push(holiday);
    });
    console.log(list);

    setFilteredData(list);
  };

  return (
    <section>
      <SearchComponent />
      <hr />
      {allResponse && (
        <div>
          <FilterComponent holidays={allResponse} onFilterChange={onFilterChange} filters={filters} setFilters={setFilters} />
          <SearchResultComponent data={filteredData || allResponse} />
        </div>
      )}
    </section>
  );
}
