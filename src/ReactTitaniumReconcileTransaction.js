import CallbackQueue from 'react/lib/CallbackQueue';
import PooledClass from 'react/lib/PooledClass';
import Transaction from 'react/lib/Transaction';

const { assign } = Object;

const QUEUEING = {
  initialize: function () {
    this.reactMountReady.reset();
  },
  close: function () {
    this.reactMountReady.notifyAll();
  }
};

function ReactTitaniumReconcileTransaction() {
  this.reinitializeTransaction();
  this.reactMountReady = CallbackQueue.getPooled(null);
}

const Mixin = {
  getTransactionWrappers() {
    return [QUEUEING];
  },
  getReactMountReady() {
    return this.reactMountReady;
  },
  destructor() {
    CallbackQueue.release(this.reactMountReady);
    this.reactMountReady = null;
  }
};

assign(
  ReactTitaniumReconcileTransaction.prototype,
  Transaction.Mixin,
  Mixin
);

PooledClass.addPoolingTo(ReactTitaniumReconcileTransaction);

export default ReactTitaniumReconcileTransaction;
