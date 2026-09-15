import { Clock, AlertCircle, CheckCircle } from 'lucide-react'

interface SLAIndicatorProps {
  slaVencimiento?: string
  estado: string
  compact?: boolean
}

export default function SLAIndicator({ slaVencimiento, estado, compact = false }: SLAIndicatorProps) {
  if (!slaVencimiento || estado === 'ATENDIDO') {
    return (
      <div className="flex items-center gap-1 text-green-600">
        <CheckCircle className="w-4 h-4" />
        {!compact && <span className="text-sm font-semibold">Resuelto</span>}
      </div>
    )
  }

  const ahora = new Date()
  const vencimiento = new Date(slaVencimiento)
  const diffMs = vencimiento.getTime() - ahora.getTime()
  const diffHoras = diffMs / (1000 * 60 * 60)
  const diffMinutos = Math.round((diffMs % (1000 * 60 * 60)) / (1000 * 60))

  // Determinar estado
  let status = 'en_plazo'
  if (diffHoras < 0) {
    status = 'vencido'
  } else if (diffHoras < 2) {
    status = 'critico'
  } else if (diffHoras < 6) {
    status = 'advertencia'
  }

  const getStatus = () => {
    switch (status) {
      case 'vencido':
        return {
          color: 'bg-red-100 text-red-700',
          icon: AlertCircle,
          label: 'SLA VENCIDO',
          time: 'Hace ' + Math.abs(Math.floor(diffHoras)) + 'h',
        }
      case 'critico':
        return {
          color: 'bg-orange-100 text-orange-700',
          icon: Clock,
          label: 'CRÍTICO',
          time: Math.floor(diffHoras) + 'h ' + diffMinutos + 'm',
        }
      case 'advertencia':
        return {
          color: 'bg-yellow-100 text-yellow-700',
          icon: Clock,
          label: 'PRÓXIMO A VENCER',
          time: Math.floor(diffHoras) + 'h ' + diffMinutos + 'm',
        }
      default:
        return {
          color: 'bg-green-100 text-green-700',
          icon: Clock,
          label: 'EN PLAZO',
          time: Math.floor(diffHoras) + 'h ' + diffMinutos + 'm',
        }
    }
  }

  const statusInfo = getStatus()
  const Icon = statusInfo.icon

  if (compact) {
    return (
      <div className={`px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 ${statusInfo.color}`}>
        <Icon className="w-3 h-3" />
        {statusInfo.time}
      </div>
    )
  }

  return (
    <div className={`px-3 py-2 rounded-lg ${statusInfo.color}`}>
      <div className="flex items-center gap-2 mb-1">
        <Icon className="w-4 h-4" />
        <span className="text-xs font-bold uppercase">{statusInfo.label}</span>
      </div>
      <div className="text-sm font-semibold">{statusInfo.time}</div>

      {/* Progress Bar */}
      <div className="mt-2 w-full bg-white bg-opacity-30 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${
            status === 'vencido' ? 'bg-red-600' :
            status === 'critico' ? 'bg-orange-600' :
            status === 'advertencia' ? 'bg-yellow-600' :
            'bg-green-600'
          }`}
          style={{ width: `${Math.max(0, Math.min(100, (diffHoras / 24) * 100))}%` }}
        ></div>
      </div>
    </div>
  )
}
