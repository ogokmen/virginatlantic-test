import { h } from 'preact';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-preact-pure';
import SearchResult from './searchResult.component';

configure({ adapter: new Adapter() });

//hotel.content.hotelFacilities

const data = [{ pricePerPerson: '1000', hotel: { content: { hotelFacilities: ['Restaurant'], starRating: '5' } } }];

describe('SearchResult', () => {
  it('should display the table correctly', async () => {
    const currency_component = mount(<SearchResult data={data} />);

    expect(currency_component.find('td[test-id="pricePerPerson"]').text()).toBe(data[0].pricePerPerson);
    expect(currency_component.find('td[test-id="hotelFacilities"]').text()).toBe(data[0].hotel.content.hotelFacilities[0]);
    expect(currency_component.find('td[test-id="starRating"]').text()).toBe(data[0].hotel.content.starRating);
  });
});
