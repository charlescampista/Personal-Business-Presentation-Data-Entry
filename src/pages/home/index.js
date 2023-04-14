import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from './../../services/api';
import { TextField, Button, Card, CardContent, Grid, Alert } from '@mui/material';

export default function Home() {
  const [token] = useState(localStorage.getItem('token'));
  const [user_id] = useState(localStorage.getItem('user'));
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contacts, setContacts] = useState([]);
  const [socialMedia, setSocialMedia] = useState([]);
  const [projects, setProjects] = useState([]);
  const [websites, setWebsites] = useState([]);
  const [contactCompany, setContactCompany] = useState('');
  const [description, setDescription] = useState('');
  const [oficial_website, setOficialWebsite] = useState('');
  const [avatar, setAvatar] = useState('');
  const [base64, setBase64] = useState(null);

  // useEffect(() => {
  //   api.get("/api/qrcode/1?data=Olha",{
  //     headers: {
  //       Authorization: `Bearer ${token}`
  //     }
  //   }).then((res) => {
  //     console.log(res.data.data);
  //     setBase64(res.data.data);
  //   }).catch((err) => {
  //     console.log(err);
  //   });
  // },[]);

  const handleAddWebsite = () => {
    setWebsites([...websites, '']);
  };

  const handleRemoveWebsite = (index) => {
    const updated = [...websites];
    updated.splice(index, 1);
    setWebsites(updated);
  };

  const handleWebsiteChange = (index, value) => {
    const tempWebsite = [...websites];
    tempWebsite[index] = value;
    setWebsites(tempWebsite);
  };

  const handleAddContact = () => {
    setContacts([...contacts, '']);
  };

  const handleRemoveContact = (index) => {
    const updated = [...contacts];
    updated.splice(index, 1);
    setContacts(updated);
  }

  const handleContactChange = (index, value) => {
    const tempContact = [...contacts];
    tempContact[index] = value;
    setContacts(tempContact);
  };

  const handleAddSocialMedia = () => {
    setSocialMedia([...socialMedia, '']);
  };

  const handleRemoveSocialMedia = (index) => {
    const updated = [...socialMedia];
    updated.splice(index, 1);
    setSocialMedia(updated);
  };

  const handleSocialMediaChange = (index, value) => {
    const tempSocialMedia = [...socialMedia];
    tempSocialMedia[index] = value;
    setSocialMedia(tempSocialMedia);
  };

  const handleAddProject = () => {
    setProjects([...projects, '']);
  };

  const handleRemoveProject = (index) => {
    const update = [...projects];
    update.splice(index,1);
    setProjects(update);
  }

  const handleProjectChange = (index, value) => {
    const tempProjects = [...projects];
    tempProjects[index] = value;
    setProjects(tempProjects);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name,
      lastName,
      oficial_website,
      socialMedia,
      projects,
      contacts,
      websites,
      contactCompany,
      description,
      avatar,
    };

    data.projects.map(project => {
      console.log({ ...project, ...{ user_id } })
      api.post('api/projects', { ...project, ...{ user_id } }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        console.log(response);
      })
    });

    data.socialMedia.map(socialMedia => {
      api.post(
        'api/socialmedia',
        { ...socialMedia, ...{ user_id } },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      ).then((response) => {
        console.log(response);
      })
    });

    data.contacts.map(contact => {
      api.post(
        'api/contacts',
        { ...contact, ...{ user_id } },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      ).then((response) => {
        console.log(response);
      })
    });

    data.websites.map(website => {
      api.post(
        'api/websites',
        { ...website, ...{ user_id } },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      ).then((response) => {
        console.log(response);
      })
    });


    



  };


  function Base64Image(src, alt = "qrcode") {
    const imageSource = `data:image/png;base64,${src}`;
    console.log(imageSource);
    return <img style={{ width: 300, height: 300 }} src={imageSource} alt={alt} />;
  }

  return (
    <Grid container justifyContent="center">
      {base64 ? Base64Image(base64) : console.log("Não")}
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <Card variant="outlined">
          <CardContent>






            <form onSubmit={handleSubmit}>




              <Grid container direction="column" justify="center" alignItems="center" spacing={2}>


                <Grid item>
                  <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ marginBottom: '10px' }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    style={{ marginBottom: '10px' }}
                  />
                </Grid>

                <Grid item>
                  <TextField
                    label="Contact Company"
                    value={contactCompany}
                    onChange={(e) => setContactCompany(e.target.value)}
                    style={{ marginBottom: '10px' }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{ marginBottom: '10px' }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Official Website"
                    value={oficial_website}
                    onChange={(e) => setOficialWebsite(e.target.value)}
                    style={{ marginBottom: '10px' }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Avatar"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                    style={{ marginBottom: '10px' }}
                  />
                </Grid>

                {/* SOCIAL MEDIA */}
                <h2>Social Media</h2>
                <Grid item style={{ marginBottom: '10px' }}>
                  <Button variant="contained" onClick={handleAddSocialMedia} style={{ minWidth: 'auto' }}>+</Button>
                </Grid>
                {socialMedia.map((item, index) => (
                  <Grid item key={index} style={{ marginBottom: '10px' }}>
                    <h5>New Social Media</h5>
                    <TextField
                      label="Title"
                      value={item.title}
                      onChange={(e) => handleSocialMediaChange(index, { ...item, title: e.target.value })}
                      style={{ minWidth: '200px' }}
                    />
                    <TextField
                      label="Link"
                      value={item.link}
                      onChange={(e) => handleSocialMediaChange(index, {...item, link: e.target.value} )}
                      style={{ minWidth: '200px' }}
                      
                    />
                    <Button variant="contained" color="error" onClick={() => handleRemoveSocialMedia(index)} style={{ minWidth: 'auto' }}>-</Button>
                  </Grid>
                ))}



                {/* PROJECTS */}
                <h2>Projects</h2>
                <Grid item style={{ marginBottom: '10px' }}>
                  <Button variant="contained" onClick={handleAddProject} style={{ minWidth: 'auto' }}>+</Button>
                </Grid>

                {projects.map((item, index) => (
                  <Grid item container direction="column" justify="center" alignItems="center" spacing={2} key={index} style={{ marginBottom: '10px' }}>
                    <h5>New Project</h5>
                    <TextField
                      md={12}
                      label="Title"
                      value={item.title}
                      onChange={(e) => handleProjectChange(index, { ...item, title: e.target.value })}
                      style={{ margin: '10px' }}
                    />
                    <TextField
                      md={12}
                      label="Link"
                      value={item.link}
                      onChange={(e) => handleProjectChange(index, { ...item, link: e.target.value })}
                      style={{ margin: '10px' }}
                    />
                    <TextField
                      md={12}
                      label="Description"
                      value={item.description}
                      onChange={(e) => handleProjectChange(index, { ...item, description: e.target.value })}
                      style={{ margin: '10px' }}
                    />
                    <Button variant="contained" color="error" onClick={() => handleRemoveProject(index)} style={{ minWidth: 'auto' }}>-</Button>
                  </Grid>
                ))}



                {/* CONTACTS */}
                <h2>Contacts</h2>
                <Grid item style={{ marginBottom: '10px' }}>
                  <Button variant="contained" onClick={handleAddContact} style={{ minWidth: 'auto' }}>+</Button>
                </Grid>

                {contacts.map((item, index) => (
                  <Grid item container direction="column" justify="center" alignItems="center" spacing={2} key={index} style={{ marginBottom: '10px' }}>
                    <h5>New Contact Channel</h5>
                    <TextField
                      md={12}
                      label="Title"
                      value={item.title}
                      onChange={(e) => handleContactChange(index, { ...item, title: e.target.value })}
                      style={{ margin: '10px' }}
                    />
                    <TextField
                      md={12}
                      label="Content"
                      value={item.content}
                      onChange={(e) => handleContactChange(index, { ...item, content: e.target.value })}
                      style={{ margin: '10px' }}
                    />
                    <Button variant="contained" color="error" onClick={() => handleRemoveContact(index)} style={{ minWidth: 'auto' }}>-</Button>
                  </Grid>
                ))}





                {/* WEBSITES */}
                <h2>Websites</h2>
                <Grid item style={{ marginBottom: '10px' }}>
                  <Button variant="contained" onClick={handleAddWebsite} style={{ minWidth: 'auto' }}>+</Button>
                </Grid>

                {websites.map((item, index) => (
                  <Grid item container direction="column" justify="center" alignItems="center" spacing={2} key={index} style={{ marginBottom: '10px' }}>
                    <h5>New Website</h5>
                    <TextField
                      md={12}
                      label="Title"
                      value={item.title}
                      onChange={(e) => handleWebsiteChange(index, { ...item, title: e.target.value })}
                      style={{ margin: '10px' }}
                    />
                    <TextField
                      md={12}
                      label="Link"
                      value={item.content}
                      onChange={(e) => handleWebsiteChange(index, { ...item, link: e.target.value })}
                      style={{ margin: '10px' }}
                    />
                    <Button variant="contained" color="error" onClick={() => handleRemoveWebsite(index)} style={{ minWidth: 'auto' }}>-</Button>
                  </Grid>
                ))}



                <Grid item>
                  <Button variant="contained" color="primary" type="submit">Submit</Button>
                </Grid>

              </Grid>

            </form>


          </CardContent>
        </Card>
      </Grid>




    </Grid>
  );

}
