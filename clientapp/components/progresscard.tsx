import {
  View,
  Vibration,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Octicon from "@expo/vector-icons/Octicons";
import { Agenda, AgendaList } from "react-native-calendars";
import Octicons from "@expo/vector-icons/Octicons";

const ProgressCard = () => {
  const date = new Date();
  const formattedDate = date.toISOString().slice(0, 10);
  return (
    <View style={styles.container}>
      <Text style={styles.cardHeading}>Your Progress Task</Text>
      <View style={styles.card_container}>
        <TaskCard />
        <ChartCard />
      </View>
      <Text style={styles.cardHeading}>Agenda</Text>
      <Agenda
        items={{
          [formattedDate]: [
            {
              name: "Work Event",
              desc: "Town hall meeting online",
              timeStart: "13:40",
              timeEnd: "15:40",
            },
            {
              name: "Work Event",
              desc: "Town hall meeting online",
              timeStart: "13:40",
              timeEnd: "15:40",
            },
            {
              name: "Work Event",
              desc: "Town hall meeting online",
              timeStart: "13:40",
              timeEnd: "15:40",
            },
          ],
        }}
        showClosingKnob={true}
        renderItem={(item, firstItemInDay) => {
          return <AgendaCard agenda={item} />;
        }}
        selected={formattedDate.toString()}
        markedDates={{
          [formattedDate]: { marked: true },
        }}
        onCalendarToggled={() => Vibration.vibrate(40)}
        theme={{
          agendaDayTextColor: "yellow",
          agendaDayNumColor: "green",
          agendaTodayColor: "#6461F9",
          agendaKnobColor: "#8B74E3",
        }}
      ></Agenda>
    </View>
  );
};

const TaskCard = () => {
  return (
    <View style={styles.taskcard}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={styles.taskcardtop}>
          <Octicon size={20} name="list-ordered" color="#6461F9" />
        </View>

        <View style={styles.taskcardtop}>
          <Text style={styles.taskcardtop_number}>6</Text>
        </View>
      </View>
      <View style={styles.taskcard_info}>
        <Text style={styles.taskcard_info_text}>1.Read a Book</Text>
        <Text style={styles.taskcard_info_text}>2.Attend Meeting</Text>
        <Text style={styles.taskcard_info_text}>3.Submit Code</Text>
        <Text style={styles.taskcard_info_text}>4.Review</Text>
      </View>
    </View>
  );
};

const ChartCard = () => {
  return (
    <View style={styles.chartcard}>
      <Text style={styles.taskcard_info_text}>Work Progress</Text>
      <View style={styles.chart_circle}>
        <View style={styles.chart_inner_circle}>
          <Text style={styles.taskcardtop_number}>6 / 10</Text>
        </View>
      </View>
      <Text
        style={[styles.taskcard_info_text, { textAlign: "center", margin: 10 }]}
      >
        Tasks Done
      </Text>
    </View>
  );
};

const AgendaCard = ({ agenda }) => {
  return (
    <TouchableOpacity style={styles.agendacard}>
      <Text style={styles.agendacard_title}>{agenda.name}</Text>
      <Text style={styles.agendacard_desc}>{agenda.desc}</Text>
      <Text style={styles.agendacard_time_wrapper}>
        <Octicons name="clock" size={13} /> {agenda.timeStart} -{" "}
        {agenda.timeEnd}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 19,
    borderRadius: 20,
    margin: 10,
    flex: 1,
  },
  cardHeading: {
    fontSize: 20,
    color: "#1E1E1E",
    fontWeight: "500",
  },
  taskcard: {
    backgroundColor: "#E4E2FF",
    height: 250,
    flex: 1,
    padding: 20,
    borderRadius: 25,
  },
  chartcard: {
    backgroundColor: "#F3F5FF",
    borderRadius: 25,
    flex: 1,
    height: 250,
    padding: 20,
  },
  card_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    marginVertical: 10,
  },
  taskcardtop: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 300,
  },
  taskcardtop_number: {
    fontFamily: "PlayWrite",
    fontSize: 20,
    paddingHorizontal: 4,
    fontWeight: "bold",
  },
  taskcard_info: {
    gap: 10,
    paddingTop: 20,
  },
  taskcard_info_text: {
    fontFamily: "Poppins",
    fontWeight: "400",
    fontSize: 18,
  },
  chart_circle: {
    marginTop: 10,
    backgroundColor: "#E4E2FF",
    height: "66%",
    width: "100%",
    borderRadius: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  chart_inner_circle: {
    backgroundColor: "#F3F5FF",
    height: "80%",
    width: "80%",
    borderRadius: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  agendacard: {
    backgroundColor: "#fff",
    borderRadius: 13,
    padding: 10,
    margin: 20,
    borderWidth: 0.5,
    borderColor: "#E4E2FF",
    borderBottomLeftRadius: 0,
  },
  agendacard_title: {
    fontSize: 14,
  },
  agendacard_desc: {
    fontSize: 18,
    fontWeight: "600",
  },
  agendacard_time_wrapper: {
    alignSelf: "flex-end",
    alignItems: "center",
    gap: 10,
  },
});

export default ProgressCard;
