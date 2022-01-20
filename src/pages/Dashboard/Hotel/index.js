import HotelCard from "../../../components/HotelCard";
export default function Hotel() {
  return (
    mockedHotelsData.map((hotel) => {
      return (<HotelCard key={hotel.name}/>);
    })
  );
}

const mockedHotelsData = [
  {
    id: 1,
    name: "Driven Resort",
    imageUrl: "https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg",
    accommodationTypes: "Single e Double",
    vacancies: 15,
    rooms: [
      {
        id: 1,
        hotelId: 1,
        number: 101,
        vacancies: [
          {
            id: 1,
            roomId: 1,
            isAvailable: true
          },
          {
            id: 2,
            roomId: 1,
            isAvailable: false
          }
        ]
      },
      {
        id: 2,
        hotelId: 1,
        number: 102,
        vacancies: [
          {
            id: 3,
            roomId: 1,
            isAvailable: true
          }
        ]
      }
    ]
  }
];
