export default function ExecutiveDashboard() {
  return (
    <div className="container-page">
      <h1 className="text-3xl font-bold mb-6">Dashboard Ejecutivo</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="font-bold">Cumplimiento SLA Global</h3>
          <p className="text-3xl font-bold text-status-resolved">96.2%</p>
        </div>
        <div className="card">
          <h3 className="font-bold">Tickets Abiertos</h3>
          <p className="text-3xl font-bold text-status-open">24</p>
        </div>
        <div className="card">
          <h3 className="font-bold">Autoatención IA</h3>
          <p className="text-3xl font-bold text-status-resolved">68%</p>
        </div>
      </div>
    </div>
  )
}
