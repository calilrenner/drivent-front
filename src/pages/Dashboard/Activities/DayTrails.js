import styled from "styled-components";
import { BiLogIn, BiCheckCircle } from "react-icons/bi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import useApi from "../../../hooks/useApi";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useEffect } from "react";

export default function DayTrails({ dayTrails, setUpdateEvents, updateEvents }) {
  const [conflictMsg, setConflictMsg] = useState("");
  return (
    <TrailsContainerStyle>
      {dayTrails.map((trail) => {
        return (
          <EventTrails
            id={trail.id}
            key={trail.trailName}
            trailName={trail.trailName}
            events={trail.events}
            setUpdateEvents={setUpdateEvents}
            updateEvents={updateEvents}
            setConflictMsg={setConflictMsg}
            conflictMsg={conflictMsg}
          />
        );
      })}
    </TrailsContainerStyle>
  );
}

function EventTrails({ trailName, events, setUpdateEvents, updateEvents, conflictMsg, setConflictMsg }) {
  const { event } = useApi();
  const userId = useLocalStorage("userData")[0].user.id;
  const [updateToast, setUpdateToast] = useState(false);
  const [updateComponents, setUpdateComponents] = useState(false);
  const [newUserEvent, setNewUserEvent] = useState({});
  const [updateIcon, setUpdateIcon] = useState(false);
  const notify = () => toast(({ toastProps }) => {
    toastProps.position = "top-center";
    toastProps.closeOnClick = true;
    return(
      <ConflictContainer>
        <span>{conflictMsg}</span>
      </ConflictContainer>
    );}
  );

  const userEvent = (eventId) => {
    event.postUserEvent({ userId, eventId }).then((res) => {
      setUpdateEvents(!updateEvents);
      setNewUserEvent({ ...newUserEvent, eventId });
    }).catch(err => {
      if(err.response.status === 409) {
        setConflictMsg(err.response.data.message);
        setUpdateToast(true);
        setUpdateComponents(!updateComponents);
        setNewUserEvent({ ...newUserEvent, eventId });
      }
    });
  };

  const updateUserEvent = (eventId) => {
    event.updateUserEvent({ userId, eventId }).then(() => setUpdateEvents(!updateEvents));
  };

  useEffect(() => {
    if(updateToast) {
      notify();
    }
  }, [conflictMsg, updateComponents]);

  return (
    <TrailContainerStyle>
      <TitleStyle>
        <span>{trailName}</span>
      </TitleStyle>
      <EventContainerStyle>
        {events.map((event) => {
          return (
            <EventCardStyle key={event.name} duration={event.duration} reserved={event.reservedByThisUser && true}>
              <EventDescrpiptionStyle>
                <EventTitleStyle>{event.name}</EventTitleStyle>
                <EventTimeStyle>
                  {event.startTime} - {event.endTime}
                </EventTimeStyle>
              </EventDescrpiptionStyle>
              <SeparatorStyle />
              <VacanciesStyle>
                {event.vacancies > 0 ? (!event.reservedByThisUser ? (
                  <VacanciesAvailabilityStyle
                    color="#078632"
                    isAvailable={true}
                    onClick={() => userEvent(event.id)}
                  >
                    <AvailableIcon />
                    <div>{event.vacancies} vagas</div>
                  </VacanciesAvailabilityStyle>
                ): 
                  (<VacanciesAvailabilityStyle
                    color={updateIcon ? "red" : "#078632"}
                    isAvailable={true}
                    onClick={() => updateUserEvent(event.id)}
                    onMouseOver={() => setUpdateIcon(true)}
                    onMouseOut={() => setUpdateIcon(false)}
                  >
                    {updateIcon ? <><CancelEventIcon /><div>Cancelar</div></> : (<><ReservedIcon /><div>Inscrito</div></>)}
                  </VacanciesAvailabilityStyle>)
                ) : (
                  <VacanciesAvailabilityStyle
                    color="#CC6666"
                    isAvailable={false}
                  >
                    <UnavailableIcon />
                    <div>Esgotado</div>
                  </VacanciesAvailabilityStyle>
                )}
              </VacanciesStyle>
            </EventCardStyle>
          );
        })}
      </EventContainerStyle>
    </TrailContainerStyle>
  );
}

const TrailsContainerStyle = styled.section`
  width: 100%;
  margin-top: 40px;
  display: flex;
  font-family: "Roboto", sans-serif;
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
  color: #7b7b7b;
  display: flex;
  justify-content: center;
  padding: 13px 0 13px 0;
`;

const EventContainerStyle = styled.div`
  width: 100%;
  height: 350px;
  padding: 14px;
  border: 1px solid #d7d7d7;
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
  height: ${(props) =>
    Math.floor(props.duration) === props.duration
      ? props.duration * 90 - 10
      : props.duration * 90}px;
  background-color: ${({ reserved }) => reserved ? 
    "#D0FFDB" : "#f1f1f1"};
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
  background-color: #cfcfcf;
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

  :hover {
    cursor: ${(props) => (props.isAvailable ? "pointer" : "not-allowed")};
    filter: ${(props) =>
    props.isAvailable ? "brightness(1.2)" : "brightness(1)"};
  }
`;

const AvailableIcon = styled(BiLogIn)`
  font-size: 18px;
`;

const UnavailableIcon = styled(AiOutlineCloseCircle)`
  font-size: 18px;
`;

const ReservedIcon = styled(BiCheckCircle)`
  color: green;
  font-size: 18px;
`;

const ConflictContainer = styled.div`
  display: flex;
  flex-direction: column;

span {
  font-size: 15px;
  height: 100%;
  color: red;
}
`;

const CancelEventIcon = styled(MdCancel)`
  color: red;
  font-size: 18px;
`;
