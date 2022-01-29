import styled from "styled-components";
import { BiLogIn } from "react-icons/bi";
import { AiOutlineCloseCircle } from "react-icons/ai";

export default function DayTrails({ dayTrails }) {
  return(
    <TrailsContainerStyle>
      {
        dayTrails.map((trail) => {
          return (
            <EventTrails
              id={trail.id}
              key={trail.trailName}
              trailName={trail.trailName}
              events={trail.events}
            />
          );
        })
      }
    </TrailsContainerStyle>
  );
}

function EventTrails({ id, trailName, events }) {
  return (
    <TrailContainerStyle>
      <TitleStyle>
        <span>{trailName}</span>
      </TitleStyle>
      <EventContainerStyle>
        {
          events.map((event) => {
            return (
              <EventCardStyle key={event.name} duration={event.duration}>
                <EventDescrpiptionStyle>
                  <EventTitleStyle>{event.name}</EventTitleStyle>
                  <EventTimeStyle>{event.startTime} - {event.endTime}</EventTimeStyle>
                </EventDescrpiptionStyle>
                <SeparatorStyle/>
                <VacanciesStyle>
                  { 
                    event.vacancies > 0
                      ?
                      <VacanciesAvailabilityStyle color='#078632' isAvailable={true}>
                        <AvailableIcon/>
                        <div>{event.vacancies} vagas</div>
                      </VacanciesAvailabilityStyle>
                      :
                      <VacanciesAvailabilityStyle color='#CC6666' isAvailable={false}>
                        <UnavailableIcon/>
                        <div>Esgotado</div>
                      </VacanciesAvailabilityStyle>
                  }
                </VacanciesStyle>
              </EventCardStyle>
            );
          })
        }
      </EventContainerStyle>
    </TrailContainerStyle>
  );
}

const TrailsContainerStyle = styled.section`
  width: 100%;
  margin-top: 40px;
  display: flex;
  font-family: 'Roboto', sans-serif;
`;

const TrailContainerStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleStyle = styled.div`
  width: 100%;
  font-size: 17px;
  color: #7B7B7B;
  display: flex;
  justify-content: center;
  padding: 13px 0 13px 0;
`;

const EventContainerStyle = styled.div`
  width: 100%;
  height: 350px;
  padding: 14px;
  border: 1px solid #D7D7D7;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: lightgray;
    border-radius: 20px;
  }
`;

const EventCardStyle = styled.div`
  width: 100%;
  height: ${(props) => Math.floor(props.duration) === props.duration ? (props.duration*90)-10: props.duration*90}px;
  background-color: #F1F1F1;
  padding: 15px 10px 10px 10px;
  border-radius: 5px;
  margin-bottom: 10px;

  display: flex;
`;

const EventDescrpiptionStyle = styled.div`
  width: 70%;
`;
const EventTitleStyle = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: #343434;
`;
const EventTimeStyle = styled.div`
  margin-top: 5px;
  font-size: 12px;
  color: #343434;
`;

const SeparatorStyle = styled.div`
  width: 1px;
  height: 100%;
  background-color: #CFCFCF;
`;

const VacanciesStyle = styled.div`
  width: 30%;
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const VacanciesAvailabilityStyle = styled.div`
  text-align: center;
  font-size: 9px;
  color: ${(props) => props.color};

  :hover{
    cursor: ${(props) => props.isAvailable ? "pointer" : "not-allowed"};
    filter: ${(props) => props.isAvailable ? "brightness(1.2)" : "brightness(1)"};
  }
`;

const AvailableIcon = styled(BiLogIn)`
  font-size: 18px;
`;

const UnavailableIcon = styled(AiOutlineCloseCircle)`
  font-size: 18px;
`;
