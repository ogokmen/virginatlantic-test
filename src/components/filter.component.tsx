import { h, JSX } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import * as styles from './filter.module.less';
import { SelectComponent } from './select.component';
import { Holiday } from '../types/booking';

const STAR_RATING = [1, 2, 3, 4, 5];
const PRICE_PER_PERSON = [
  { value: '{ "min": 0, "max": 1000 }', description: '£0-£1000' },
  { value: '{ "min": 1001, "max": 2000 }', description: '£1001-£2000' },
  { value: '{ "min": 2001, "max": 3000 }', description: '£2001-£3000' },
  { value: '{ "min": 3001, "max": 1000000 }', description: '£3001+' },
];

interface FilterComponentProp {
  holidays: Holiday[];
  onFilterChange: (any) => void;
  filters: any;
  setFilters: any;
}

export default function FilterComponent(props: FilterComponentProp): JSX.Element {
  const [facilities, setFacilities] = useState([]);

  console.log({ filters: props.filters });

  const collectFacilities = (holidays: Holiday[]): any => {
    console.log('collectFacilities');
    const facilities: string[] = [];
    holidays.forEach(
      ({
        hotel: {
          content: { hotelFacilities },
        },
      }) => {
        hotelFacilities.forEach((facility: any) => {
          if (facilities.indexOf(facility) === -1) facilities.push(facility);
        });
      }
    );

    return facilities;
  };

  useEffect(() => {
    console.log('useEffect');
    setFacilities(collectFacilities(props.holidays));
    //const newFilters = { facility: null, starRating: null, pricePerPerson: null };
    //setFilters(newFilters);
    //props.onFilterChange(filters);
  }, []);

  const onFilterChange = (target) => {
    const newFilters = { ...props.filters, [target.name]: target.value };
    props.setFilters(newFilters);
    props.onFilterChange(newFilters);
  };

  return (
    <section className={`${styles['filter-form']} full-bleed`}>
      <div className="wrapper">
        <div className={styles['grid']}>
          <div className={styles['col']}>
            <SelectComponent onChange={onFilterChange} name="facility" label="Facility" value={props.filters?.facility || ''} options={facilities.map((facility) => ({ description: facility, value: facility }))} />
          </div>
          <div className={styles['col']}>
            <SelectComponent onChange={onFilterChange} name="starRating" label="Star Rating" value={props.filters?.starRating || ''} options={STAR_RATING.map((rating) => ({ description: rating, value: rating }))} />
          </div>
          <div className={styles['col']}>
            <SelectComponent onChange={onFilterChange} name="pricePerPerson" label="Price Per Person" value={props.filters?.pricePerPerson || ''} options={PRICE_PER_PERSON} />
          </div>
        </div>
      </div>
    </section>
  );
}
