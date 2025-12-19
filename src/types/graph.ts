export type ServiceStatus = 'healthy' | 'error' | 'degraded';

export type ServiceNodeData = {
  name: string;
  status: ServiceStatus;
  cpu: number;
  memory: number;
  disk: number;
  region: number;
  price: number;
  icon?: string;
  iconBg?: string;
  provider?: 'aws' | 'gcp' | 'azure';
};
