import React from 'react'
import PMDetails from './skill/pmDetails';
import TXDetails from './skill/txDetails';
import FRDetails from './skill/frDetails';
import AADetails from './skill/aaDetails';
import FMDetails from './skill/fmDetails';
import CBLDetails from './skill/cblDetails';
import MAdetails from './knowledge/maDetails';
import BTDetails from './knowledge/btDetails';
import FADetails from './knowledge/faDetails';
import AAADetails from './professional/optionals/aaaDetails';
import ATXDetails from './professional/optionals/atxDetails';
import AFMDetails from './professional/optionals/afmDetails';
import APMDetails from './professional/optionals/apmDetails';
import SBLDetails from './professional/essentials/sblDetails';
import SBRDetails from './professional/essentials/sbrDetails';

export default function SubjectDetailsPage({ title }) {
  let ChildComponent;
  switch (title) {
    case 'Business and Technology':
      ChildComponent = () => <BTDetails />;
      break;
    case 'Management Accounting':
      ChildComponent = () => <MAdetails />;
      break;
    case 'Financial Accounting':
      ChildComponent = () => <FADetails />;
      break;
    case 'Strategic Business Leader':
      ChildComponent = () => <SBLDetails />;
      break;
    case 'Strategic Business Reporting':
      ChildComponent = () => <SBRDetails />;
      break;
    case 'Advanced Audit and Assurance':
      ChildComponent = () => <AAADetails />;
      break;
    case 'Advanced Financial Management':
      ChildComponent = () => <AFMDetails />;
      break;
    case 'Advanced Performance Management':
      ChildComponent = () => <APMDetails />;
      break;
    case 'Advanced Taxation':
      ChildComponent = () => <ATXDetails />;
      break;
      case 'Corporate and Business Law':
      ChildComponent = () => <CBLDetails />;
      break;
      case 'Performance Management':
      ChildComponent = () => <PMDetails />;
      break;
      case 'Taxation':
      ChildComponent = () => <TXDetails />;
      break;
      case 'Financial Reporting':
      ChildComponent = () => <FRDetails />;
      break;
      case 'Audit and Assurance':
      ChildComponent = () => <AADetails />;
      break;
      case 'Financial Management':
      ChildComponent = () => <FMDetails />;
      break;
    default:
      ChildComponent = () => <></>;
      break;
  }

  return (
    <div className='p-5'>
      <h1 className='text-4xl'>{title}</h1>
      <ChildComponent />
    </div>
  );
}