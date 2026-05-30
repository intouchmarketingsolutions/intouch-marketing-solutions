import React from 'react'
import CreativeServiceDetail from './CreativeServiceDetail'
import { SERVICES } from '../../data/services'

export default function GraphicDesignPage() {
  return <CreativeServiceDetail service={SERVICES.find(s => s.id === 10)} />
}
