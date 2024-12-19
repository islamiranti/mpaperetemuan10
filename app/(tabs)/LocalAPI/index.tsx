import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";

// Definisi tipe untuk anggota
type Member = {
  id: string;
  name: string;
  email: string;
  field: string;
};

const App: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [field, setField] = useState<string>("");
  const [data, setData] = useState<Member[]>([]); // Tipe array didefinisikan sebagai Member[]

  const addMember = () => {
    if (name === "" || email === "" || field === "") {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    const newMember: Member = {
      id: Date.now().toString(),
      name,
      email,
      field,
    };

    setData([...data, newMember]);
    setName("");
    setEmail("");
    setField("");
  };

  const deleteMember = (id: string) => {
    setData(data.filter((item) => item.id !== id));
  };

  const renderItem = ({ item }: { item: Member }) => (
    <View style={styles.listItem}>
      <View style={styles.avatar} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.email}>{item.email}</Text>
        <Text style={styles.field}>{item.field}</Text>
      </View>
      <TouchableOpacity onPress={() => deleteMember(item.id)} style={styles.deleteButton}>
        <Text style={styles.deleteText}>X</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Local API (JSON Server)</Text>
      <TextInput
        placeholder="Nama Lengkap"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Bidang"
        style={styles.input}
        value={field}
        onChangeText={setField}
      />
      <TouchableOpacity style={styles.addButton} onPress={addMember}>
        <Text style={styles.addButtonText}>SIMPAN</Text>
      </TouchableOpacity>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "green",
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  email: {
    color: "#555",
  },
  field: {
    color: "#555",
  },
  deleteButton: {
    marginLeft: 10,
  },
  deleteText: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default App;