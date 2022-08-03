import React from 'react';
import {
    Container,
    Table,
    Button,
    Form
} from 'react-bootstrap';

import { server } from '../../Services/Server';
import { USERS_ENDPOINT } from '../../Config/endpoints';

const UserForm = ({ setUsers, users, setAddUsers, user_data }) => {
    const [userData, setUserData] = React.useState({
        name: "",
        age: 0,
        email: "",
        sex: "",
        profileId: "621879dd64b14e67d2633a82"
    });

    React.useEffect(() => {
        if(user_data) setUserData({...user_data.value});
    }, [user_data]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setUserData({
            ...userData, [name]: value
        });
    }

    const submitForm = () => {
        if(userData._id) {
            server("PUT", USERS_ENDPOINT+"/"+userData._id, userData).then((response) => {
                const data = response.data.data;
                setUsers([...users, data]);
            });
        } else {
            server("POST", USERS_ENDPOINT, userData).then((response) => {
                const data = response.data.data;
                setUsers([...users, data]);
            });
        }

        setAddUsers(false);
    }

    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="name" placeholder="Enter username" name="name" value={userData.name} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Age</Form.Label>
                <Form.Control type="number" placeholder="age" value={userData.age} name="age" onChange={handleChange} />
            </Form.Group>
            
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="email" value={userData.email} name="email" onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Sex</Form.Label>
                <Form.Select aria-label="Default select example" value={userData.sex} name="sex" onChange={handleChange} >
                    <option value="select">select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </Form.Select>
            </Form.Group>
            
            <Form.Group className="mb-3">
                <Form.Label>Profile Id</Form.Label>
                <Form.Control type="text" placeholder="profileId" disabled={true} value={userData.profileId} onChange={handleChange} />
            </Form.Group>

            <Button variant="primary" onClick={submitForm}>
                Submit
            </Button>
        </Form>
    )
}

export const About = () => {
    const [users, setUsers] = React.useState([]);
    const [addUsers, setAddUsers] = React.useState(false);
    const [userData, setUserData] = React.useState({});

    const getUsers = async () => {
        const response = await server("GET", USERS_ENDPOINT);
        if(response.data.data.length !== 0) setUsers(response.data.data);
    }

    const handleAddUsers = (flag) => setAddUsers(flag);

    const showEditForm = (value) => {
        setUserData({ ...userData, value });
        setAddUsers(true);
    }

    React.useEffect(() => {
        getUsers();
    }, []);

    return (
        <Container>
            <h1 className="home-title">About Us</h1>

            <Button onClick={() => handleAddUsers(true)}>Add more users</Button>            

            {   addUsers ? <Button onClick={() => handleAddUsers(false)}>Cancle</Button> : "" }

            {
                addUsers ?  <UserForm setUsers={setUsers} users={users} setAddUsers={setAddUsers} user_data={userData}  />  : ""
            }

            {
                users.length !== 0 ?
                <>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Sex</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((usr, index) => 
                                    <tr key={usr._id}>
                                        <td>{index+1}</td>
                                        <td>{usr.name}</td>
                                        <td>{usr.age}</td>
                                        <td>{usr.sex}</td>
                                        <td>{usr.email}</td>
                                        <td><Button onClick={() => showEditForm(usr)}>Edit</Button></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </> : ""
            }
        </Container>
    );
}