/* eslint-disable no-console */
import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import { PageTitle, PageSubtitle, Center, BlockedText } from "../../../components/DefaultTabStyle";
import Button from "../../../components/Form/Button";
import useApi from "../../../hooks/useApi";
import Loading from "../../../components/Loading";
import UserContext from "../../../contexts/UserContext";
import DayTrails from "./DayTrails";

export default function Activities() {
  const weekdays = [
    {
      id: 1,
      day: "Sexta, 22/10",
      isSelected: false,
    },
    {
      id: 2,
      day: "Sábado, 23/10",
      isSelected: false,
    },
    {
      id: 3,
      day: "Domingo, 24/10",
      isSelected: false,
    }
  ];

  const [days, setDays] = useState(weekdays);
  const [loading, setLoading] = useState(false);
  const [hasPayment, setHasPayment] = useState(false);
  const [isPresential, setIsPresential] = useState(false);
  const [activities, setActivities] = useState(false);
  
  const { userData } = useContext(UserContext);
  const userId = userData.user.id;
  const { payment, event } = useApi();

  useEffect(() => {
    setLoading(true);
    payment.findPayment(userId)
      .then((response) => {
        if (response.status === 200) {
          setHasPayment(true);
          response.data[0].modalityId === 1 ? setIsPresential(true) : setIsPresential(false);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [hasPayment, isPresential]);

  const selectDay = (ev) => {
    const newArray = weekdays.map((d, index) => {
      if (d.id.toString() === ev.currentTarget.id) {
        event.getEventsByDay(d.id)
          .then((response) => {
            console.log(response.data);
            setActivities(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
        return { ...d, isSelected: true };
      } else {
        return { ...d, isSelected: false };
      }
    });
    setDays(newArray);
  };
  return (
    <>
      <PageTitle>Escolha de atividades</PageTitle>
      {
        hasPayment && isPresential
          ?
          <>
            <PageSubtitle visible={true}>Primeiro, filtre pelo dia do evento: </PageSubtitle>
            <Weekdays>
              {days.map((d) => {
                return (
                  <Day
                    key={d.id}
                    id={d.id}
                    onClick={selectDay}
                    selected={d.isSelected}
                  >{d.day}</Day>
                );
              })}
            </Weekdays>
            {
              activities !== false 
                ? 
                <DayTrails dayTrails={activities}/>
                : 
                <div/>}
          </>
          :
          <Center>
            {
              loading
                ?
                <Loading />
                :
                <BlockedText>
                  {
                    hasPayment
                      ?
                      "Sua modalidade de ingresso não necessita escolher atividade. Você terá acesso a todas as atividades"
                      :
                      "Você precisa ter confirmado pagamento antes de fazer a escolha de atividades"
                  }
                </BlockedText>
            }
          </Center>       
      }
    </>
  );
}

const Weekdays = styled.form`
  width: fit-content;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 18px;
`;

const Day = styled(Button)`
  max-width: 150px;
  text-transform: none !important;
  background-color: ${(props) => props.selected ? "#FFD37D !important" : ""}
`;

const mockedActivitiesDay1 = [
  {
    id: 1,
    trailName: "Auditório Principal",
    events: [
      {
        id: 1,
        name: "Palestra A",
        startTime: "09:00",
        endTime: "10:00",
        duration: 1,
        vacancies: 15
      },
      {
        id: 2,
        name: "Palestra B",
        startTime: "10:00",
        endTime: "11:00",
        duration: 1,
        vacancies: 0
      },
      {
        id: 3,
        name: "Palestra C",
        startTime: "11:00",
        endTime: "12:00",
        duration: 1,
        vacancies: 15
      }

    ]
  },
  {
    id: 2,
    trailName: "Auditório Lateral",
    events: [
      {
        id: 4,
        name: "Palestra D",
        startTime: "09:00",
        endTime: "10:30",
        duration: 1.5,
        vacancies: 15
      }
    ]
  },
  {
    id: 3,
    trailName: "Workroom",
    events: [
      {
        id: 5,
        name: "Palestra E",
        startTime: "09:00",
        endTime: "11:00",
        duration: 2,
        vacancies: 15
      },
      {
        id: 6,
        name: "Palestra F",
        startTime: "11:00",
        endTime: "12:00",
        duration: 1,
        vacancies: 15
      }
    ]
  },
];

const mockedActivitiesDay2 = [
  {
    id: 1,
    trailName: "Auditório Principal",
    events: [
      {
        id: 1,
        name: "Palestra A",
        startTime: "09:00",
        endTime: "10:00",
        duration: 1.5,
        vacancies: 15
      },
      {
        id: 2,
        name: "Palestra B",
        startTime: "10:00",
        endTime: "11:00",
        duration: 2,
        vacancies: 0
      },
      {
        id: 3,
        name: "Palestra C",
        startTime: "11:00",
        endTime: "12:00",
        duration: 1,
        vacancies: 15
      }

    ]
  },
  {
    id: 2,
    trailName: "Auditório Lateral",
    events: [
      {
        id: 4,
        name: "Palestra D",
        startTime: "09:00",
        endTime: "10:30",
        duration: 3,
        vacancies: 15
      }
    ]
  },
  {
    id: 3,
    trailName: "Workroom",
    events: [
      {
        id: 5,
        name: "Palestra E",
        startTime: "09:00",
        endTime: "11:00",
        duration: 1.5,
        vacancies: 15
      },
      {
        id: 6,
        name: "Palestra F",
        startTime: "11:00",
        endTime: "12:00",
        duration: 1.5,
        vacancies: 15
      }
    ]
  },
];

const mockedActivitiesDay3 = [
  {
    id: 1,
    trailName: "Auditório Principal",
    events: [
      {
        id: 1,
        name: "Palestra A",
        startTime: "09:00",
        endTime: "10:00",
        duration: 1,
        vacancies: 15
      },
      {
        id: 2,
        name: "Palestra B",
        startTime: "10:00",
        endTime: "11:00",
        duration: 1,
        vacancies: 0
      },
      {
        id: 3,
        name: "Palestra C",
        startTime: "11:00",
        endTime: "12:00",
        duration: 1,
        vacancies: 15
      }

    ]
  },
  {
    id: 2,
    trailName: "Auditório Lateral",
    events: [
      {
        id: 4,
        name: "Palestra D",
        startTime: "09:00",
        endTime: "10:30",
        duration: 1.5,
        vacancies: 15
      }
    ]
  },
  {
    id: 3,
    trailName: "Workroom",
    events: [
      {
        id: 5,
        name: "Palestra E",
        startTime: "09:00",
        endTime: "11:00",
        duration: 2,
        vacancies: 15
      },
      {
        id: 6,
        name: "Palestra F",
        startTime: "11:00",
        endTime: "12:00",
        duration: 1,
        vacancies: 15
      }
    ]
  },
];
