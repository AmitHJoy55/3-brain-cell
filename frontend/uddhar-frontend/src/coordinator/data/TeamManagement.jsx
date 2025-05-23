import axios from "axios";

export const assignATeam = async (teamId, disasterId, teamData) => {
  console.log("Assigning team: ", teamId, " to disaster: ", disasterId);
  try {
    const response = await axios.post(`http://localhost:3000/coordinators/teams/${teamId}/assign-location`, teamData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    
    if (response.status === 200 || response.data.status === "success") {
      return {
        status: true,
        message: "Team assigned successfully",
      };
    } 
    console.error("Error assigning team: ", response.data.message);
    return {
      status: false,
      message: response.data.message,
    };
  } catch (error) {
    console.error("Error assigning team: ", error);
    return { status: false, message: "Error assigning team" };
  }
};

export const getTeamData = async (disasterId) => {
  try {
    const response = await axios.get(`http://localhost:3000/coordinators/teams/${disasterId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.status === 200 || response.data.status === "success") {
      return {
        status: true,
        data: response.data.data.teams,
      }
    } 
    return {
      status: false,
      message: response.data.message,
    };
  }
  catch (error) {
    return {
      status: false,
      message: "Error fetching team data",
      error: error.message,
    };
  }
}

export const getUpozilas = async (location) => {
  const district = location.split(",")[0].trim();
  try {
    const response = await axios.get(`https://bdapi.editboxpro.com/api/upazilas/${district}`);
    if(response.status === 200) {
      return {
        status: true,
        data: response.data,
      };
    }
  } catch (error) {
    console.error("Error fetching Upozilas: ", error);
    return {
      status: false,
      message: "Error fetching Upozilas",
    };
    
  }
}

