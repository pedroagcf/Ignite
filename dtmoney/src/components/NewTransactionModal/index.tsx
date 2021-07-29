import { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import input from '../../assets/inputs.svg';
import output from '../../assets/outputs.svg';
import closeImg from '../../assets/close.svg';
import { Container, TransactionTypeContainer, RadioBox } from './styles';
import { api } from '../../services/api';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}
export function NewTransactionModal ({isOpen, onRequestClose}: NewTransactionModalProps) {
  
  const [type, setType] = useState('deposit');
  const [title, setTitle] = useState('');
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState('');

  function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    const data = {
      title, 
      value,
      category, 
      type
    };

    api.post('transactions', data);
    
  }

  return (
    <Modal 
        isOpen={isOpen} 
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <button className="react-modal-close"
          type="button" 
          onClick={onRequestClose}
        > 
          <img src={closeImg} alt="fechar modal" />
        </button>
        
        <Container onSubmit={handleCreateNewTransaction}>
          <h2>cadastrar transação</h2>

          <input 
            placeholder="Titulo" 
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
          <input 
            type="number"
            placeholder="Valor"
            value={value}
            onChange={event => setValue(Number(event.target.value))}  
          />

          <TransactionTypeContainer>
            <RadioBox 
              type="button"
              onClick={() => { setType('deposit') }}
              isActive={type === 'deposit'}
              activeColor="green"
            >
              <img src={input} alt="entrada" />
              <span>Entrada</span>
            </RadioBox>

            <RadioBox 
              type="button"
              onClick={() => { setType('withdraw') }}
              isActive={type === 'withdraw'}
              activeColor="red"
              >
              <img src={output} alt="saida" />
              <span>Saída</span>
            </RadioBox>
          </TransactionTypeContainer>

          <input 
            placeholder="Categoria" 
            value={category}
            onChange={event => setCategory(event.target.value)}
          />

          <button type="submit">
            Cadastrar
          </button>
        </Container>
      </Modal>
  )
}