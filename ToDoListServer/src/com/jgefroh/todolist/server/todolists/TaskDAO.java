package com.jgefroh.todolist.server.todolists;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.jgefroh.todolist.server.core.ToDoListGenericDAO;

/**
 * @author Joseph Gefroh
 */
@Stateless
public class TaskDAO extends ToDoListGenericDAO {
}
