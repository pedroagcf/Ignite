import { FormEvent, useState } from 'react';
import Modal from 'react-modal';


import input from '../../assets/inputs.svg';
import output from '../../assets/outputs.svg';
import closeImg from '../../assets/close.svg';

import { Container, TransactionTypeContainer, RadioBox } from './styles';
import { useTransactions } from '../../hooks/useTransactions';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}
export function NewTransactionModal ({isOpen, onRequestClose}: NewTransactionModalProps) {
  
  const {createTransaction} = useTransactions();
  
  const [type, setType] = useState('deposit');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();
    
    await createTransaction({
      title,
      amount, 
      category,
      type
    })

    setTitle('')
    setAmount(0)
    setCategory('')
    setType('deposit')
    onRequestClose();
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
            value={amount}
            onChange={event => setAmount(Number(event.target.value))}  
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