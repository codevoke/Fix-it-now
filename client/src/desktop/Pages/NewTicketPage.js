import styled from '@emotion/styled';
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Divider, Button, TextField, Typography } from '@mui/material';

const Content = styled("div") ({
    position: 'relative',
    width: '60vw',
    left: '20vw',
    top: '90px',
    marginBottom: '125px',
    padding: '1.5em 2em',
    background: 'whitesmoke',
    borderRadius: '1em',
    boxSizing: 'border-box'
})
const FormGroup = styled("div") ({
    position: 'relative',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridRowGap: '5px',
    margin: '20px 0'
})
const VisuallyHiddenInput = styled('input') ({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const FormTitle = ({text}) => {return (<Typography variant='h5' sx={{position: 'relative', left: '5px'}}>{text}</Typography>); }
const FormInput = ({placeholder, multiline, rows, inputRef}) => {
    return (<TextField variant='outlined' placeholder={placeholder} multiline={multiline} rows={rows} inputRef={inputRef} />); 
}

export default function NewTicketPage () {
    const navigate = useNavigate();

    useEffect(() => {        
        if (localStorage.auth !== "true") {
            toast.error("Вы должны быть авторизованы для просмотра страницы");
            navigate("/login");
        }
    }, [navigate])
    

    const titleRef = useRef();
    const subtitleRef = useRef();
    const descriptionRef = useRef();
    const locationRef = useRef();

    const createNewTicket = () => {
        const title = titleRef.current.value;
        const subtitle = subtitleRef.current.value;
        const description = descriptionRef.current.value;
        const location = locationRef.current.value;

        console.log(title, subtitle, description, location)

        const photoInputList = document.querySelectorAll("#photo-input");
        for (let photoInput of photoInputList) {
            console.log(photoInput.files[0])
        }

        // TODO: realise sending data to server
    }
    return (
        <>
            <Content>
                <center><Typography variant='h4'>Создание новой заявки</Typography></center><br />
                <Divider />
                <FormGroup>
                    <FormTitle text="Название поломки" />
                    <FormInput placeholder={'Введите краткое название поломки'} inputRef={titleRef} />
                </FormGroup>
                <FormGroup>
                    <FormTitle text="Краткое описание" />
                    <FormInput placeholder={'Краткое описание поломки (5-10 слов)'} inputRef={subtitleRef} />
                </FormGroup>
                <FormGroup>
                    <FormTitle text="Подробное описание" />
                    <FormInput placeholder={'Введите подробное описание того что произошло'} multiline rows={4} inputRef={descriptionRef} />
                </FormGroup>
                <FormGroup>
                    <FormTitle text="Местонахождение" />
                    <FormInput placeholder={'Номер кабинета или конкретное место'} inputRef={locationRef} />
                </FormGroup>
                <FormGroup>
                    <FormTitle text="Прикрепите фотографии" />
                    <Uploader />
                </FormGroup>
                <FormGroup>
                    <Button variant='outlined' onClick={createNewTicket}>Создать</Button>
                </FormGroup>
            </Content>
        </>
    )
}

function Uploader () {
    const [buttonList, setButtonList] = useState([]);
    
    const handleAddButton = () => {
        setButtonList((prevButtons) => [
            ...prevButtons, 
            <UploaderInput emitSuccess={handleAddButton} />
        ]);
    }
    
    return (
        <>
            <UploaderInput emitSuccess={handleAddButton}  />
            {buttonList}
        </>
    )
}

function UploaderInput({ emitSuccess }) {
    const [fileName, setFileName] = useState('');
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        setFileName(file.name);
        emitSuccess();
      }
    };
  
    return (
      <Button component="label" variant="contained">
        { fileName ? `Прикреплено (${fileName})` : "Прикрепить файл" }
        <VisuallyHiddenInput type="file" onChange={handleFileChange} id='photo-input'/>
      </Button>
    );
}